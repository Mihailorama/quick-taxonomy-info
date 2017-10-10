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

import * as classNames from 'classnames';
import * as React from 'react';
import { isUndefined } from 'util';
import { Taxonomy } from '@cfl/bigfoot-search-service';

import './taxonomy-search.less';

export interface TaxonomySearchProps {
  taxonomies: Taxonomy[];
  selectedEntryPointId?: number;
  searchText?: string;

  onSearch?: () => any;
  onSearchTextChange: (search: string) => any;
  onTaxonomyEntryPointChange: (entryPointId: number) => any;
}

export default function TaxonomySearch({ taxonomies, selectedEntryPointId, searchText,
    onTaxonomyEntryPointChange, onSearchTextChange, onSearch }: TaxonomySearchProps): JSX.Element {
  const hasTaxonomy = !isUndefined(selectedEntryPointId);
  return (
    <form className='app-TaxonomySearch-container' onSubmit={e => {e.preventDefault(); if (onSearch) { onSearch(); }}}>
      <div className='app-TaxonomySearch-select'>
        <select required value={selectedEntryPointId || ''} onChange={e => onTaxonomyEntryPointChange(+e.currentTarget.value)}>
          <option key='none' value='' disabled hidden>Taxonomy</option>
          {taxonomies.map(t => <optgroup label={t.name}>
            {t.entryPoints.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </optgroup>)}
        </select>
      </div>
      <div className={classNames('app-TaxonomySearch-search', {'app-TaxonomySearch-searchEnabled': hasTaxonomy})}>
        <input type='text' placeholder='Search' value={searchText} onChange={e => onSearchTextChange(e.currentTarget.value)}/>
      </div>
    </form>
  );
}
