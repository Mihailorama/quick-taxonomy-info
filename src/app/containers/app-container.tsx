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
import { Component, Props } from 'react';
import { connect } from 'react-redux';

import { AppState, AppPhase } from '../state';
import App from '../components/app';
import AppBarContainer from '../corefiling/app-bar-container';
import { Taxonomy } from '@cfl/bigfoot-search-service';

type OwnProps = Props<AppContainer>;

interface PropsFromState {
  phase: AppPhase;
  message?: string;
  taxonomies?: Taxonomy[];
}

type AppContainerProps = OwnProps & PropsFromState;

class AppContainer extends Component<AppContainerProps> {
  render(): JSX.Element {
    const {message, phase, taxonomies} = this.props;
    return (
      <div>
        <AppBarContainer className='app-App-appBar'/>
        <App message={message} phase={phase} taxonomies={taxonomies} />
      </div>
    );
  }
}

function propsFromState(state: AppState): PropsFromState {
  const { message, phase, taxonomies } = state;
  return { message, phase, taxonomies };
}

export default connect(propsFromState)(AppContainer);
