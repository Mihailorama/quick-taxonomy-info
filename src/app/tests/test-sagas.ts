/*
 *  Copyright 2017 CoreFiling S.A.R.L.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { all, call, put } from 'redux-saga/effects';

import {
  startupInfoReceivedAction, startupInfoFailedAction,
  SEARCH, searchFailedAction, searchResultsReceived, SearchAction } from '../actions';
import { apiFetchJson } from '../api-fetch';
import { startupInfoSaga, searchSaga } from '../sagas';
import { exampleUser, exampleApps, exampleTaxonomies, exampleSearchResults } from './model-examples';
import { taxonomiesApi, conceptsApi } from '../urls';
import { ConceptSearchMatch } from '@cfl/bigfoot-search-service';

describe('startupInfoSaga', () => {
  it('calls APIs in parallel', () => {
    const saga = startupInfoSaga();

    expect(saga.next().value).toEqual(all([
      call(apiFetchJson, '/api/user'),
      call(apiFetchJson, '/api/apps'),
      call([taxonomiesApi, taxonomiesApi.getTaxonomies]),
    ]));
    expect(saga.next([exampleUser, exampleApps, exampleTaxonomies]).value)
      .toEqual(put(startupInfoReceivedAction(exampleUser, exampleApps, exampleTaxonomies)));
  });

  it('is sad if error fetching', () => {
    const saga = startupInfoSaga();

    saga.next();
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value)
    .toEqual(put(startupInfoFailedAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});

describe('searchSaga', () => {

  const action: SearchAction = {type: SEARCH, entryPointId: 1, query: { search: 'foo' } };
  const saga = searchSaga(action);

  it('fetches search results', () => {
    const expectedParams = {
      entryPointId: 1,
      search: { search: 'foo' },
      pageNumber: 1,
      pageSize: 100,
    };

    expect(saga.next().value).toEqual(
      call([conceptsApi, conceptsApi.searchConceptDetailed], expectedParams),
    );

    const results: ConceptSearchMatch[] = exampleSearchResults;
    expect(saga.next(results).value)
      .toEqual(put(searchResultsReceived(results)));
  });

  it('is sad if error fetching', () => {
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value)
    .toEqual(put(searchFailedAction(jasmine.stringMatching(/LOLWAT/) as any)));
    saga.next();
  });
});
