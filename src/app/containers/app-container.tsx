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
import { Taxonomy, ReferencePart, ConceptSearchQuery, ConceptSearchMatch } from '@cfl/bigfoot-search-service';
import { taxonomyEntryPointChangedAction, searchAction, queryChangedAction } from '../actions';

type OwnProps = Props<AppContainer>;

interface PropsFromState {
  phase: AppPhase;
  message?: string;
  taxonomies?: Taxonomy[];
  results?: ConceptSearchMatch[];
  query: ConceptSearchQuery;
  selectedEntryPointId?: number;
  selectedEntryPointReferenceParts?: ReferencePart[];
}

interface PropsFromDispatch {
  onTaxonomyEntryPointChange: typeof taxonomyEntryPointChangedAction;
  onSearch: typeof searchAction;
  onQueryChange: typeof queryChangedAction;
}

type AppContainerProps = OwnProps & PropsFromState & PropsFromDispatch;

class AppContainer extends Component<AppContainerProps> {
  render(): JSX.Element {
    const {
      message, phase,
      onSearch, onQueryChange, onTaxonomyEntryPointChange,
      results, query, selectedEntryPointId, selectedEntryPointReferenceParts,
      taxonomies} = this.props;
    return (
      <div>
        <AppBarContainer className='app-App-appBar'/>
        <App
          message={message}
          onSearch={onSearch}
          onTaxonomyEntryPointChange={onTaxonomyEntryPointChange}
          onQueryChange={onQueryChange}
          phase={phase}
          results={results}
          query={query}
          selectedEntryPointId={selectedEntryPointId}
          referenceParts={selectedEntryPointReferenceParts}
          taxonomies={taxonomies} />
      </div>
    );
  }
}

function propsFromState(state: AppState): PropsFromState {
  const { message, phase, results, query, selectedEntryPointId, selectedEntryPointReferenceParts, taxonomies } = state;
  return { message, phase, results, query, selectedEntryPointId, selectedEntryPointReferenceParts, taxonomies };
}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  onSearch: searchAction,
  onQueryChange: queryChangedAction,
  onTaxonomyEntryPointChange: taxonomyEntryPointChangedAction,
};

export default connect(propsFromState, propsFromDispatch)(AppContainer);
