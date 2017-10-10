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

import { AppState } from '../state';
import { mainReducer } from '../reducers';
import { searchResultsReceived, searchFailedAction, searchTextChangedAction, taxonomyEntryPointChangedAction } from '../actions';
import { exampleSearchResults } from '../tests/model-examples';

describe('mainReducer', () => {
  const state: AppState = mainReducer(undefined, undefined as any);
  it('has sensible initial state', () => {
    expect(state.searchText).toEqual('');
    expect(state.selectedEntryPointId).toBeUndefined();
    expect(state.results).toBeUndefined();
  });
  it('updates entry point and clears results on entry point change', () => {
    state.results = exampleSearchResults;
    const newEntryPoint = 99;

    const newState = mainReducer(state, taxonomyEntryPointChangedAction(newEntryPoint));

    expect(newState.selectedEntryPointId).toEqual(newEntryPoint);
    expect(newState.results).toBeUndefined();
  });
  it('updates text and clears results on search text change', () => {
    state.results = exampleSearchResults;
    const newText = 'lala land';

    const newState = mainReducer(state, searchTextChangedAction(newText));

    expect(newState.searchText).toEqual(newText);
    expect(newState.results).toBeUndefined();
  });
  it('updates search results', () => {
    const newState = mainReducer(state, searchResultsReceived(exampleSearchResults));

    expect(newState.results).toEqual(exampleSearchResults);
  });
  it('records message if search fails', () => {
    const message = 'sad things';
    const newState = mainReducer(state, searchFailedAction(message));
    expect(newState.message).toEqual(message);
  });
});
