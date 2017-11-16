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
import { Taxonomy, ConceptSearchQuery, ConceptSearchMatch } from '@cfl/bigfoot-search-service';

import { AppPhase } from '../state';
import TaxonomySearch from './taxonomy-search';
import SearchResults from './search-results';

import './search-form.less';

export interface SearchFormProps {
  taxonomies?: Taxonomy[];
  query: ConceptSearchQuery;
  selectedEntryPointId?: number;
  results?: ConceptSearchMatch[];
  phase: AppPhase;

  onSearch: (entryPointId: number, query: ConceptSearchQuery) => any;
  onQueryChange: (query: ConceptSearchQuery) => any;
  onTaxonomyEntryPointChange: (entryPointId: number) => any;
}

export default function SearchForm({
  phase, taxonomies, query, selectedEntryPointId, results,
  onSearch, onQueryChange, onTaxonomyEntryPointChange,
}: SearchFormProps): JSX.Element {
  return (
    <div className='app-SearchForm'>
      {taxonomies ? <TaxonomySearch
        taxonomies={taxonomies} selectedEntryPointId={selectedEntryPointId}
        onSearch={selectedEntryPointId ? () => onSearch(selectedEntryPointId, query) : undefined}
        onQueryChange={onQueryChange}
        onTaxonomyEntryPointChange={onTaxonomyEntryPointChange}
      /> : 'Loading ….'}
      {results && <SearchResults results={results}/>}
      {!selectedEntryPointId && phase === 'ready' && <div className='app-SearchForm-prompt'>Please select a taxonomy to search.</div>}
      {phase === 'searching' && <div className='app-SearchForm-loading'></div>}
    </div>
  );
}
