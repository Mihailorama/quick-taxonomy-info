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
 * Actions are used to pass info from the UI back to the state and sagas.
 */
import { Action } from 'redux';

import { App, User } from './models';
import { Taxonomy, ConceptSearchMatch, ConceptSearchQuery } from '@cfl/bigfoot-search-service';

export const STARTUP_INFO_RECEIVED = 'STARTUP_INFO_RECEIVED';
export const STARTUP_INFO_FAILED = 'STARTUP_INFO_FAILED';

export const SEARCH = 'SEARCH';
export const TAXONOMY_ENTRY_POINT_CHANGED = 'TAXONOMY_ENTRY_POINT_CHANGED';
export const SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const QUERY_CHANGED = 'QUERY_CHANGED';

export interface StartupInfoReceivedAction extends Action {
  user: User;
  apps: App[];
  taxonomies: Taxonomy[];
}

export function startupInfoReceivedAction(user: User, apps: App[], taxonomies: Taxonomy[]): StartupInfoReceivedAction {
  return {type: STARTUP_INFO_RECEIVED, user, apps, taxonomies};
}

export interface FailedAction extends Action {
  message?: string;
}

export function startupInfoFailedAction(message: string): FailedAction {
  return {type: STARTUP_INFO_FAILED, message};
}

export interface TaxonomyEntryPointChangedAction extends Action {
  entryPointId: number;
}

export function taxonomyEntryPointChangedAction(entryPointId: number): TaxonomyEntryPointChangedAction {
  return {type: TAXONOMY_ENTRY_POINT_CHANGED, entryPointId};
}

export interface QueryChangedAction extends Action {
  query: ConceptSearchQuery;
}

export function queryChangedAction(query: ConceptSearchQuery): QueryChangedAction {
  return {type: QUERY_CHANGED, query};
}

export interface SearchAction extends Action {
  entryPointId: number;
  query: ConceptSearchQuery;
}

export function searchAction(entryPointId: number, query: ConceptSearchQuery): SearchAction {
  return {type: SEARCH, entryPointId, query};
}

export interface SearchResultsReceivedAction extends Action {
  results: ConceptSearchMatch[];
}

export function searchResultsReceived(results: ConceptSearchMatch[]): SearchResultsReceivedAction {
  return {type: SEARCH_RESULTS_RECEIVED, results};
}

export function searchFailedAction(message: string): FailedAction {
  return {type: SEARCH_FAILED, message};
}
