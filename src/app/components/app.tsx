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
import { Taxonomy } from '@cfl/bigfoot-search-service';

import './app.less';

export interface AppProps {
  message?: string;
  phase: AppPhase;
  taxonomies?: Taxonomy[];
}

export default function App({message, phase, taxonomies}: AppProps): JSX.Element {
  switch (phase) {
    case 'ready':
      return (
        <ul>
          { taxonomies && taxonomies.map(t => <li key={t.id}>{t.name}</li>) }
        </ul>
      );
    case 'startup':
      return <p>Starting up...</p>;
    case 'startupfailed':
    default:
      return <p>Error{message && `: ${message}`}</p>;
  }
}
