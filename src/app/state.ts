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
 * State of the app as a whole.
 */

import { User, App } from './models';
import { Taxonomy, ReferencePart, ConceptSearchQuery, ConceptSearchMatch } from '@cfl/bigfoot-search-service';

export type AppPhase = 'startup' | 'startupfailed' | 'searching' | 'searchfailed' | 'ready';

export interface AppState {
  phase: AppPhase;
  user?: User;
  apps?: App[];
  taxonomies?: Taxonomy[];
  selectedEntryPointId?: number;
  selectedEntryPointReferenceParts?: ReferencePart[];
  query: ConceptSearchQuery;
  results?: ConceptSearchMatch[];
  message?: string;
}
