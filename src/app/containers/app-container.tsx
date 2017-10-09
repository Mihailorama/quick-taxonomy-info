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
import { connect, MapDispatchToProps } from 'react-redux';

import { AppState, AppPhase } from '../state';
import App from '../components/app';
import AppBarContainer from '../corefiling/app-bar-container';
import { Taxonomy, ConceptSearchMatch } from '@cfl/bigfoot-search-service';
import { taxonomyEntryPointChangedAction, searchAction, searchTextChangedAction } from '../actions';

type OwnProps = Props<AppContainer>;

interface PropsFromState {
  phase: AppPhase;
  message?: string;
  taxonomies?: Taxonomy[];
  results?: ConceptSearchMatch[];
  searchText: string;
  selectedEntryPointId?: number;
}

interface PropsFromDispatch {
  onTaxonomyEntryPointChange: typeof taxonomyEntryPointChangedAction;
  onSearch: typeof searchAction;
  onSearchTextChange: typeof searchTextChangedAction;
}

type AppContainerProps = OwnProps & PropsFromState & PropsFromDispatch;

class AppContainer extends Component<AppContainerProps> {
  render(): JSX.Element {
    const {
      message, phase,
      onSearch, onSearchTextChange, onTaxonomyEntryPointChange,
      results, searchText, selectedEntryPointId,
      taxonomies} = this.props;
    return (
      <div>
        <AppBarContainer className='app-App-appBar'/>
        <App
          message={message}
          onSearch={onSearch}
          onTaxonomyEntryPointChange={onTaxonomyEntryPointChange}
          onSearchTextChange={onSearchTextChange}
          phase={phase}
          results={results}
          searchText={searchText}
          selectedEntryPointId={selectedEntryPointId}
          taxonomies={taxonomies} />
      </div>
    );
  }
}

function propsFromState(state: AppState): PropsFromState {
  const { message, phase, results, searchText, selectedEntryPointId, taxonomies } = state;
  return { message, phase, results, searchText, selectedEntryPointId, taxonomies };
}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  onSearch: searchAction,
  onSearchTextChange: searchTextChangedAction,
  onTaxonomyEntryPointChange: taxonomyEntryPointChangedAction,
};

export default connect(propsFromState, propsFromDispatch)(AppContainer);
