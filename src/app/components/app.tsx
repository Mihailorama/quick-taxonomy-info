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

import * as React from 'react';

import { AppPhase } from '../state';
import { Taxonomy, EntryPoint, ConceptSearchMatch } from '@cfl/bigfoot-search-service';

import './app.less';

export interface AppProps {
  message?: string;
  phase: AppPhase;
  taxonomies?: Taxonomy[];
  searchText: string;
  selectedEntryPointId?: number;
  results?: ConceptSearchMatch[];
  onSearch: (entryPointId: number, search: string) => any;
  onSearchTextChange: (search: string) => any;
  onTaxonomyEntryPointChange: (entryPointId: number) => any;
}

export default function App(props: AppProps): JSX.Element {
  const {message, phase, searchText, taxonomies, selectedEntryPointId,
    onSearch, onSearchTextChange, onTaxonomyEntryPointChange,
    results,
  } = props;
  const entryPoints: EntryPoint[] = taxonomies && [].concat.apply([], taxonomies.map(t => t.entryPoints));

  switch (phase) {
    case 'ready':
      // Scrappy UI to be replaced with fancy components.
      return (
        <div>
          <ul>
            <select value={selectedEntryPointId} onChange={e => e.target.value && onTaxonomyEntryPointChange(parseInt(e.target.value, 10))}>
              <option> -- Select a taxonomy -- </option>
              {entryPoints && entryPoints.map(e =>
                <option key={e.id} value={e.id}>{e.name}</option>)
              }
            </select>
            <input type='text' placeholder='Search' onChange={e => onSearchTextChange(e.target.value)}></input>
            <button
              disabled={selectedEntryPointId === undefined}
              onClick={() => onSearch(selectedEntryPointId as number, searchText)}>Go!</button>
          </ul>
          {results && <ul>{results.map(m => <li>{m.label}</li>)}</ul>}
        </div>
      );
    case 'startup':
      return <p>Starting up...</p>;
    case 'startupfailed':
    default:
      return <p>Error{message && `: ${message}`}</p>;
  }
}
