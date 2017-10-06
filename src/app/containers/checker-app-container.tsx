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
import CheckerApp from '../components/checker-app';
import AppBarContainer from '../corefiling/app-bar-container';

type OwnProps = Props<CheckerAppContainer>;

interface PropsFromState {
  phase: AppPhase;
  // We'll want the entry points etc.
}

type CheckerAppContainerProps = OwnProps & PropsFromState;

class CheckerAppContainer extends Component<CheckerAppContainerProps> {
  render(): JSX.Element {
    return (
      <div>
        <AppBarContainer className='ckr-CheckerApp-appBar'/>
        <CheckerApp />
      </div>
    );
  }
}

function propsFromState(state: AppState): PropsFromState {
  const { phase } = state;
  return { phase };
}

export default connect(propsFromState)(CheckerAppContainer);
