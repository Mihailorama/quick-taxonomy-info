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

import './search-results.less';
import { ConceptSearchMatch } from '@cfl/bigfoot-search-service';
import { MAX_RESULTS } from '../models';

export interface SearchResultsProps {
  results: ConceptSearchMatch[];
}

export default function SearchResults({results}: SearchResultsProps): JSX.Element {
  return (
    <div className='app-SearchResults'>
      <table>
        <colgroup>
          <col className='app-SearchResults-logoColumn'/>
          <col span={2} className='app-SearchResults-dataColumns'></col>
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>Local Name</th>
            <th>Concept</th>
          </tr>
        </thead>
        <tbody>
          {results.map((t, i) => <tr key={i}>
            <td className='app-SearchResults-linkHolder'>
              <a className='app-SearchResults-logoLink' target='_blank' href={t.conceptHref}></a>
            </td>
            <td>
              <a className='app-SearchResults-link' target='_blank' href={t.conceptHref} title={t.localName}>{t.localName}</a>
            </td>
            <td>
              <a className='app-SearchResults-link' target='_blank' href={t.conceptHref} title={t.label}>{t.label}</a>
            </td>
          </tr>)}
          {results.length === MAX_RESULTS && <tr>
            <td className='app-SearchResults-maxResults' colSpan={3}>Limited to {MAX_RESULTS} results.</td>
          </tr>}
          {results.length === 0 && <tr><td className='app-SearchResults-noResults' colSpan={3}>No results.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
