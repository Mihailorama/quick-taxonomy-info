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
import {
  startupInfoReceivedAction,
  searchResultsReceived, searchAction, searchFailedAction, queryChangedAction, taxonomyEntryPointChangedAction
} from '../actions';
import { exampleUser, exampleApps, exampleSearchResults } from '../tests/model-examples';

describe('mainReducer', () => {
  const state: AppState = mainReducer(undefined, undefined as any);
  it('has sensible initial state', () => {
    expect(state.query).toEqual({ search: '' });
    expect(state.selectedEntryPointId).toBeUndefined();
    expect(state.results).toBeUndefined();
  });

  it('sorts taxonomies by name', () => {
    const taxonomies = [
      { id: 69, name: 'Alice', version: '2018-01-01', entryPoints: [] },
      { id: 13, name: 'Bob', version: 'final-rev4', entryPoints: [] },
      { id: 42, name: 'Alice', version: '2017-01-01', entryPoints: [] },
    ];

    const newState = mainReducer(state, startupInfoReceivedAction(exampleUser, exampleApps, taxonomies));

    expect(newState.taxonomies).toEqual([
      { id: 42, name: 'Alice', version: '2017-01-01', entryPoints: [] },
      { id: 69, name: 'Alice', version: '2018-01-01', entryPoints: [] },
      { id: 13, name: 'Bob', version: 'final-rev4', entryPoints: [] },
    ]);
  });

  it('updates entry point and clears results on entry point change', () => {
    state.results = exampleSearchResults;
    const newEntryPoint = 99;

    const newState = mainReducer(state, taxonomyEntryPointChangedAction(newEntryPoint));

    expect(newState.selectedEntryPointId).toEqual(newEntryPoint);
    expect(newState.results).toBeUndefined();
  });

  it('updates query on search text change', () => {
    state.results = exampleSearchResults;
    const newQuery = {
      search: 'lala land',
    };

    const newState = mainReducer(state, queryChangedAction(newQuery));

    expect(newState.query).toEqual(newQuery);
  });

  it('updates query on ref part change', () => {
    state.results = exampleSearchResults;
    const newQuery = {
      referenceParts: [
        {
          id: 88,
          value: 'foo',
        },
      ],
    };

    const newState = mainReducer(state, queryChangedAction(newQuery));

    expect(newState.query).toEqual(newQuery);
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

  it('changes phase when search starts', () => {
    state.phase = 'ready';
    const newState = mainReducer(state, searchAction(1, { search: '' }));
    expect(newState.phase).toEqual('searching');
  });
});
