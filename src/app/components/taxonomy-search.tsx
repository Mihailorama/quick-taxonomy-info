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

import { isUndefined } from 'util';

import { Taxonomy } from '@cfl/bigfoot-search-service';
import * as React from 'react';

import './taxonomy-search.less';

export interface TaxonomySearchProps {
  taxonomies: Taxonomy[];
  selectedTaxonomy?: number;
  query?: string;
}

export default function TaxonomySearch(props: TaxonomySearchProps): JSX.Element {
  const enabled = !isUndefined(props.selectedTaxonomy);
  return (
    <div className='app-TaxonomySearch-container'>
      <div className='app-TaxonomySearch-select'>
        <select required>
          { enabled || <option disabled selected value=''>Taxonomy</option> }
          { props.taxonomies.map(t => <option key={t.id} value={t.id} selected={props.selectedTaxonomy === t.id}>{t.name}</option>) }
        </select>
      </div>
      <div className={'app-TaxonomySearch-search' + (enabled ? ' enabled' : '')}>
        <input type='text' placeholder='Search' value={props.query}/>
      </div>
    </div>
  );
}
