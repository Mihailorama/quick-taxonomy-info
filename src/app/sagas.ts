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

import { Effect } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  startupInfoFailedAction, startupInfoReceivedAction,
  SEARCH, searchResultsReceived, searchFailedAction, SearchAction,
} from './actions';
import { apiFetchJson } from './api-fetch';
import { App, User } from './models';
import { APPS, USER, conceptsApi, taxonomiesApi } from './urls';
import { Taxonomy } from '@cfl/bigfoot-search-service';

/**
 * Fetch the information needed at startup. If this fails we cannot show the app.
 */
export function* startupInfoSaga(): IterableIterator<Effect> {
  try {
    const [user, apps, taxonomies]: [User, App[], Taxonomy[]] = yield all([
      call(apiFetchJson, USER),
      call(apiFetchJson, APPS),
      call([taxonomiesApi, taxonomiesApi.getTaxonomies]),
    ]);
    yield put(startupInfoReceivedAction(user, apps, taxonomies));
  } catch (res) {
    yield put(startupInfoFailedAction(`Startup failed (${res.message || res.statusText || res.status}).`));
  }
}

export function* searchSaga(action: SearchAction): IterableIterator<Effect> {
  const { entryPointId, search } = action;
  try {
    const params = {
      entryPointId,
      search,
      // Hardcoded for now - paging to be tackled separately.
      pageNumber: 1,
      pageSize: 100,
    };
    const results = yield call([conceptsApi, conceptsApi.searchConcepts], params);
    yield put(searchResultsReceived(results));
  } catch (res) {
    yield put(searchFailedAction(`Search failed (${res.message || res.statusText || res.status}).`));
  }
}

/**
 * Watch for actions.
 */
export function* appSaga(): IterableIterator<Effect> {
  yield all([
    takeEvery(SEARCH, searchSaga),
  ]);
}
