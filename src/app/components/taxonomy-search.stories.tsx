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

import TaxonomySearch from './taxonomy-search';

import { Taxonomy } from '@cfl/bigfoot-search-service';

const taxonomies = (x: number): Taxonomy[] => {
  return new Array(x)
    .fill('')
    .map((_, i) => ({name: 'Some Taxonomy 200' + i, id: i, entryPoints: [ { name: 'Entry Point A', id: 1 } ]} as Taxonomy));
};

storiesOf('TaxonomySearch', module)
.addDecorator(story => <div style={{backgroundColor: '#fff', padding: '15px', width: '800px', display: 'flex'}}>{story()}</div>)
.add('Taxonomies, no query', () => <TaxonomySearch taxonomies={taxonomies(5)}/>)
.add('Taxonomies, with query', () => <TaxonomySearch taxonomies={taxonomies(5)} query='Cash'/>)
.add('Taxonomy selected, no query', () => <TaxonomySearch taxonomies={taxonomies(5)} selectedTaxonomy={1}/>)
.add('100 results', () => <TaxonomySearch taxonomies={taxonomies(100)}/>);
