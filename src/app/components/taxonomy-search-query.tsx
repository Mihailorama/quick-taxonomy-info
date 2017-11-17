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

import { ReferencePart, ConceptSearchQuery } from '@cfl/bigfoot-search-service';

export interface TaxonomySearchQueryProps {
  referenceParts?: ReferencePart[];
  searchText?: string;
  onQueryChange: (query: ConceptSearchQuery) => any;
}

const fieldSpecs = [
  ['Topic', 'SubTopic', 'Section', 'Paragraph'],
  ['Topic', 'SubTopic', 'Section'],
];

function partsRegex(taxonomyRefParts: ReferencePart[]): RegExp {
  const partRegex = '([\\w]{1,3})';
  return new RegExp(`^${partRegex}[-]${partRegex}${`(?:[-]${partRegex})?`.repeat(taxonomyRefParts.length - 2)}$`);
}

function getMatchingParts(taxonomyRefParts: ReferencePart[]): ReferencePart[] | undefined {
  const referencePartNames = taxonomyRefParts.map(part => part.localName);
  const fieldNames = fieldSpecs.find(fields => fields.every(field => referencePartNames.indexOf(field) >= 0));
  return fieldNames && fieldNames.map(field => taxonomyRefParts.find(part => part.localName === field)!);
}

function toSearchQuery(taxonomyRefParts: ReferencePart[] | undefined, search: string): ConceptSearchQuery {
  if (taxonomyRefParts) {
    const parts = getMatchingParts(taxonomyRefParts);
    if (parts) {
      const matches = partsRegex(parts).exec(search);
      if (matches) {
        const values = matches.slice(1);
        return {
          referenceParts: values.map((value, index) => ({
            id: parts[index].id,
            value,
          })),
        };
      }
    }
  }
  return {search};
}

function placeholderText(taxonomyRefParts?: ReferencePart[]): string {
  const parts = taxonomyRefParts && getMatchingParts(taxonomyRefParts);
  if (parts) {
    return 'Search for text or codification reference';
  }
  return 'Search for text';
}

export default class TaxonomySearchQuery extends React.Component<TaxonomySearchQueryProps> {
  componentWillReceiveProps(newProps: Readonly<TaxonomySearchQueryProps>): any {
    const {referenceParts, searchText, onQueryChange} = newProps;
    if (searchText && this.props.referenceParts !== referenceParts) {
      onQueryChange(toSearchQuery(referenceParts, searchText));
    }
  }

  render(): JSX.Element {
    const {referenceParts, searchText, onQueryChange} = this.props;
    return <input
      type='text'
      placeholder={placeholderText(referenceParts)}
      value={searchText}
      onChange={e => onQueryChange(toSearchQuery(referenceParts, e.currentTarget.value)) }
    />;
  }
}
