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

import { User, App, } from '../models';
import { Taxonomy, ConceptSearchMatch } from '@cfl/bigfoot-search-service';

export const exampleUser: User = {
  sub: 'ecdc0363-976d-4a42-a4cc-ae5d63f3a806',
  name: 'Akira Knutson',
  preferred_username: 'at',
  email: 'at@example.com',
};

export const exampleApps: App[] = [
  {id: 'beacon', name: 'Beacon', href: '/beacon/', colour: '#3c7c34', iconHref: '/img/logo-beacon.svg', features: []},
  {id: 'account', name: 'Manage account', href: '/auth/account', colour: '#3A75C4', features: []},
  {id: 'sms', name: 'Manage organisation', href: '/sms/', colour: '#3A75C4', features: []},
];

export const exampleTaxonomies: Taxonomy[] = [
  { id: 1, name: 'UK GAAP', version: '2009', entryPoints: [{id: 1, name: 'Full'}, {id: 2, name: 'Minimal'}] },
  { id: 2, name: 'US GAAP', version: '2012', entryPoints: [{id: 3, name: 'Commercial'}, {id: 4, name: 'Banking'}] },
];

export const exampleSearchResults: ConceptSearchMatch[] = [
  {
    conceptHref: 'the href',
    label: 'the label',
    localName: 'TheLocalName',
    matchedValue: 'TheLocalName',
    score: 0.99,
    type: 'localname',
  },
];
