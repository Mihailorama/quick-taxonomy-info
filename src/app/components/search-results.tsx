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

export interface SearchResultsProps {
  results: ConceptSearchMatch[];
}

export default function SearchResults({results}: SearchResultsProps): JSX.Element {
  return (
    <div className='app-SearchResults-table'>
      <table>
        <thead>
          <th></th>
          <th>Local Name</th>
          <th>Concept</th>
        </thead>
        <tbody>
          {results.map(t => <tr>
            <td className='app-SearchResults-link-holder'><a className='app-SearchResults-link' href={t.conceptHref}></a></td>
            <td>{t.localName}</td>
            <td>{t.label}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
