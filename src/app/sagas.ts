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
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  startupInfoFailedAction,
  startupInfoReceivedAction,
  TaxonomyEntryPointChangedAction,
  TAXONOMY_ENTRY_POINT_CHANGED,
  referencePartsAction,
  referencePartsReceivedAction,
  REFERENCE_PARTS,
  SEARCH,
  searchResultsReceived,
  searchFailedAction,
  searchAction,
  SearchAction,
} from './actions';
import { AppState } from './state';
import { apiFetchJson } from './api-fetch';
import { App, User, MAX_RESULTS } from './models';
import { APPS, USER, conceptsApi, taxonomiesApi, referencePartsApi } from './urls';
import { Taxonomy, ConceptSearchQuery } from '@cfl/bigfoot-search-service';

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

export function* entryPointSaga(action: TaxonomyEntryPointChangedAction): IterableIterator<Effect> {
  if (action.entryPointId) {
    yield put(referencePartsAction(action.entryPointId));
  }
}

export function* referencePartsSaga(action: TaxonomyEntryPointChangedAction): IterableIterator<Effect> {
  const { entryPointId } = action;
  if (entryPointId) {
    try {
      const params = {
        entryPointId,
      };
      const referenceParts = yield call([referencePartsApi, referencePartsApi.getReferenceParts], params);
      yield put(referencePartsReceivedAction(entryPointId, referenceParts));
      const query: ConceptSearchQuery = yield select((state: AppState) => state.query);
      yield put(searchAction(entryPointId, query));
    } catch (res) {
      yield put(startupInfoFailedAction(`Entry point selection failed (${res.message || res.statusText || res.status}).`));
    }
  }
}

export function* searchSaga(action: SearchAction): IterableIterator<Effect> {
  const { entryPointId, query: search } = action;
  try {
    const params = {
      entryPointId,
      search,
      // Hardcoded for now - paging to be tackled separately.
      pageNumber: 1,
      pageSize: MAX_RESULTS,
    };
    const results = yield call([conceptsApi, conceptsApi.searchConceptDetailed], params);
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
    takeLatest(TAXONOMY_ENTRY_POINT_CHANGED, entryPointSaga),
    takeLatest(REFERENCE_PARTS, referencePartsSaga),
    takeLatest(SEARCH, searchSaga),
  ]);
}
