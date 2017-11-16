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

/**
 * Reducers (in the Redux sense).
 */
import { Action } from 'redux';

import {
  FailedAction,
  STARTUP_INFO_RECEIVED,
  STARTUP_INFO_FAILED,
  StartupInfoReceivedAction,
  TAXONOMY_ENTRY_POINT_CHANGED,
  TaxonomyEntryPointChangedAction,
  REFERENCE_PARTS_RECEIVED,
  ReferencePartsReceivedAction,
  SEARCH,
  SEARCH_FAILED,
  SEARCH_RESULTS_RECEIVED,
  SearchResultsReceivedAction,
  QUERY_CHANGED,
  QueryChangedAction,
} from './actions';
import { AppState } from './state';

export function mainReducer(state: AppState | undefined, action: Action): AppState {
  if (!state) {
    return {
      phase: 'startup',
      query: {
        search: '',
      },
    };
  }

  switch (action.type)  {
    case STARTUP_INFO_FAILED: {
      const { message } = action as FailedAction;
      return { ...state, phase: 'startupfailed', message };
    }
    case STARTUP_INFO_RECEIVED: {
      const { user, apps, taxonomies } = action as StartupInfoReceivedAction;
      taxonomies.sort((a, b) => {
        const aa = a.name + a.version;
        const bb = b.name + b.version;
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
      return { ...state, phase: 'ready', user, apps, taxonomies };
    }
    case TAXONOMY_ENTRY_POINT_CHANGED: {
      const { entryPointId } = action as TaxonomyEntryPointChangedAction;
      return { ...state, selectedEntryPointId: entryPointId, selectedEntryPointReferenceParts: undefined, results: undefined };
    }
    case REFERENCE_PARTS_RECEIVED: {
      const { entryPointId, referenceParts } = action as ReferencePartsReceivedAction;
      if (state.selectedEntryPointId === entryPointId) {
        return { ...state, selectedEntryPointReferenceParts: referenceParts };
      }
      else {
        return state;
      }
    }
    case QUERY_CHANGED: {
      const { query } = action as QueryChangedAction;
      return { ...state, query };
    }
    case SEARCH: {
      return { ...state, results: undefined, phase: 'searching'};
    }
    case SEARCH_FAILED: {
      const { message } = action as FailedAction;
      return { ...state, phase: 'searchfailed', message };
    }
    case SEARCH_RESULTS_RECEIVED: {
      const { results } = action as SearchResultsReceivedAction;
      return { ...state, phase: 'ready', results };
    }
    default:
      break;
  }

  return state;
}
