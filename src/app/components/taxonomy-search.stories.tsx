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
import { action } from '@storybook/addon-actions';
import { Taxonomy } from '@cfl/bigfoot-search-service';

import TaxonomySearch, { TaxonomySearchProps } from './taxonomy-search';

let nextId = 1;

const adj = ['Lazy', 'Eager', 'Unique', 'Dashing', 'Basic'];
const nouns = ['Ape', 'Bee', 'Cat', 'Dog', 'Fox', 'Gee', 'Hog'];

const createName = (n: number) => `${adj[n % 5]} ${nouns[Math.floor(n / 5) % 7]} ${1 + Math.floor(n / 35)}`;

const taxonomy = (name: string, version = '2017-10-10', entryPointCount = 10) => ({
  id: ++nextId,
  name,
  version,
  entryPoints: Array(entryPointCount).fill('').map((_, i) => ({ name: 'Entry Point ' + createName(i), id: (1000 * nextId + i) })),
});

const taxonomies = (count: number): Taxonomy[] => {
  return new Array(count)
    .fill('')
    .map((_, i) => taxonomy(`Taxonomy ${createName(i)}`));
};

const actions: Pick<TaxonomySearchProps, 'onSearch' | 'onQueryChange' | 'onTaxonomyEntryPointChange'> = {
  onSearch: action('onSearch'),
  onQueryChange: action('onQueryChange'),
  onTaxonomyEntryPointChange: action('onTaxonomyEntryPointChange'),
};

storiesOf('TaxonomySearch', module)
.addDecorator(story => <div style={{color: '#222', backgroundColor: '#fff', width: '100%'}}>{story()}</div>)
.add('Taxonomies, no query', () => <TaxonomySearch
    {...actions} taxonomies={taxonomies(5)} query={{}}/>)
.add('Taxonomies, with query', () => <TaxonomySearch
    {...actions} taxonomies={taxonomies(5)} query={{search: 'Cash'}}/>)
.add('Taxonomy selected, no query', () => <TaxonomySearch
    {...actions} taxonomies={taxonomies(5)} selectedEntryPointId={17001} query={{}}/>)
.add('Taxonomy selected, longer query', () => <TaxonomySearch
    {...actions} taxonomies={taxonomies(5)} selectedEntryPointId={1001}
    query={{search: 'Antidisestablishmentarianism taxation rebate calculated according to the Antidisestablishmentarianism '
      + 'Taxation Rebate Regulations (2019)'}}/>)
.add('Taxonomy selected, with reference parts', () => <TaxonomySearch
    {...actions} taxonomies={taxonomies(5)} selectedEntryPointId={17001} query={{
      search: '123-45-67',
      referenceParts: [{id: 1, value: '123'}, {id: 2, value: '45'}, {id: 3, value: '67'}]}}
    referenceParts={[
      {id: 1, localName: 'Topic', namespace: 'ns'},
      {id: 2, localName: 'SubTopic', namespace: 'ns'},
      {id: 3, localName: 'Section', namespace: 'ns'},
      {id: 4, localName: 'SubSection', namespace: 'ns'}]}/>)
.add('100 results', () => <TaxonomySearch
    {...actions} taxonomies={taxonomies(100)} query={{}}/>);
