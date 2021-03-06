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

import { storiesOf } from '@storybook/react';

import SearchResults from './search-results';

import { ConceptSearchMatch } from '@cfl/bigfoot-search-service';

const conceptSearchResults = (x: number): ConceptSearchMatch[] => new Array(x).fill
  ({label: 'aaa', localName: 'bbb', conceptHref: 'http://cc', matchedValue: 'bbb', score: 1, type: 'localname' } as ConceptSearchMatch);

storiesOf('SearchResults', module)
.addDecorator(story => <div style={{backgroundColor: '#fff', padding: '30px', height: '100vh'}}>{story()}</div>)
.add('5 results', () => <SearchResults results={conceptSearchResults(5)}/>)
.add('100 results', () => <SearchResults results={conceptSearchResults(100)}/>);
