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
import { Taxonomy } from '@cfl/bigfoot-search-service';

import TaxonomySearch from './taxonomy-search';
import SearchResults from './search-results';

import './search-form.less';

export interface SearchFormProps {
  taxonomies?: Taxonomy[];
}

export default function SearchForm({ taxonomies }: SearchFormProps): JSX.Element {
  return (
    <div className='app-SearchForm-rectangle'>
      {taxonomies ? <TaxonomySearch taxonomies={taxonomies}/> : 'Loading ….'}
      <SearchResults results={[]}/>
    </div>
  );
}
