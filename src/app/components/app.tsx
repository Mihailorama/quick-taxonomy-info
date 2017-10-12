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
import { Taxonomy, ConceptSearchMatch } from '@cfl/bigfoot-search-service';
import SearchForm from './search-form';

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
  const {message, phase, ...searchFormProps} = props;
  switch (phase) {
    case 'ready':
    case 'searching':
      return <SearchForm phase={phase} {...searchFormProps}/>;
    case 'startup':
    case 'startupfailed':
    default:
      return <ErrorOrLoading error={message}/>;
  }
}

function ErrorOrLoading({error}: {error?: string}): JSX.Element {
  return (
    <div  className='app-ErrorOrLoading-loading'>
      <span>{error || 'Loading\u2009…'}</span>
    </div>
  );
}
