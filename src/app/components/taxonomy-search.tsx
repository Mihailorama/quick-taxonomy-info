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
import { SimpleSelect } from 'react-selectize';
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

  const groups = taxonomies.map(({id, name, version}) => ({groupId: id, title: name, version}));
  const options = taxonomies.map(taxonomy => {
    return taxonomy.entryPoints.map(({id, name}) => ({
      groupId: taxonomy.id,
      value: id,
      label: `${taxonomy.name} (${taxonomy.version}) › ${name}`}));
  })
    .reduce((xs, ys) => xs.concat(ys), []);
  const selectedOption = selectedEntryPointId ? options.find(x => x.value === selectedEntryPointId) : undefined;

  return (
    <form className='app-TaxonomySearch' onSubmit={e => {e.preventDefault(); if (onSearch) { onSearch(); }}}>
      <div className='app-TaxonomySearch-select'>
        <SimpleSelect value={selectedOption}
          hideResetButton
          placeholder='Taxonomy'
          restoreOnBackspace={() => ''}
          onValueChange={e => onTaxonomyEntryPointChange(e ? e.value : undefined)}
          renderGroupTitle={(i, {title, version}) => <div key={i} className='app-TaxonomySearch-taxonomyHeading'>
            {title} <span className='app-TaxonomySearch-taxonomyVersion'>({version})</span>
          </div>}
          renderOption={({value, label}) => <div key={value} className='app-TaxonomySearch-entryPoint'>
            {label.replace(/^.* \(.*\) › /, '')}
          </div>}
          renderValue={({label}) => {
            const [first, rest] = label.split(/›/, 2);
            return <span className='app-TaxonomySearch-selected'>
              <span className='app-TaxonomySearch-selectedTaxonomy'>{first}</span>
              <span className='app-TaxonomySearch-selectedEntryPoint'>{rest}</span>
            </span>;
          }}
          renderNoResultsFound = {() => <div className='app-TaxonomySearch-noMatches'>
            <div className='app-TaxonomySearch-missingTaxonomyLogo'></div>
            No results found. <a className='app-TaxonomySearch-noMatches-contactLink'
                href='https://www.corefiling.com/contactus/' target='_blank'
                onMouseDown={e => { /* Prevent dropdown closing before link fires. */ e.stopPropagation(); e.preventDefault(); }}>
              Contact us</a>
            <br/> to find your Taxonomy.
          </div>}
          groups={groups} options={options}/>
      </div>
      <div className={classNames('app-TaxonomySearch-search', {'app-TaxonomySearch-searchEnabled': hasTaxonomy})}>
        <input type='text' placeholder='Search' value={searchText} onChange={e => onSearchTextChange(e.currentTarget.value)}/>
        <input type='submit' className='app-TaxonomySearch-searchButton' value=''/>
      </div>
    </form>
  );
}
