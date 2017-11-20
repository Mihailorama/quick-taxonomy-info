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
  query: ConceptSearchQuery;
  onQueryChange: (query: ConceptSearchQuery) => any;
}

export const fasbCodificationRegex = /^([0-9]{3})-([0-9]{2,3})(?:-(S?[0-9]{2})(?:-([0-9]{1,4}))?)?$/;

const fieldSpecs = [
  {
    parts: ['Topic', 'SubTopic', 'Section', 'Paragraph'],
    example: '740-10-15',
    pattern: fasbCodificationRegex,
  },
];

interface ReferencePartsSpec {
  example: string;
  pattern: RegExp;
  referenceParts: ReferencePart[];
}

function getMatchingParts(taxonomyRefParts: ReferencePart[]): ReferencePartsSpec | undefined {
  const referencePartNames = taxonomyRefParts.map(part => part.localName);
  const fieldSpec = fieldSpecs.find(fields => fields.parts.every(field => referencePartNames.indexOf(field) >= 0));
  return fieldSpec && {
    example: fieldSpec.example,
    pattern: fieldSpec.pattern,
    referenceParts: fieldSpec.parts.map(field => taxonomyRefParts.find(part => part.localName === field)!),
  };
}

export function toSearchQuery(taxonomyRefParts: ReferencePart[] | undefined, search: string): ConceptSearchQuery {
  if (taxonomyRefParts) {
    const parts = getMatchingParts(taxonomyRefParts);
    if (parts) {
      const matches = parts.pattern.exec(search);
      if (matches) {
        const values = matches.slice(1);
        return {
          search,
          referenceParts: values.map((value, index) => ({
            id: parts.referenceParts[index].id,
            value,
          })).filter(part => part.value),
        };
      }
    }
  }
  return {search};
}

function placeholderText(taxonomyRefParts?: ReferencePart[]): string {
  const parts = taxonomyRefParts && getMatchingParts(taxonomyRefParts);
  if (parts) {
    return `Search for text or codification reference (e.g. ${parts.example})`;
  }
  return 'Search for text';
}

export default class TaxonomySearchQuery extends React.Component<TaxonomySearchQueryProps> {

  componentWillUpdate(nextProps: Readonly<TaxonomySearchQueryProps>): any {
    const {referenceParts, query, onQueryChange} = nextProps;
    if (query.search && this.props.referenceParts !== referenceParts) {
      onQueryChange(toSearchQuery(referenceParts, query.search));
    }
  }

  render(): JSX.Element {
    const {referenceParts, query, onQueryChange} = this.props;
    return <input
      type='text'
      placeholder={placeholderText(referenceParts)}
      value={query.search}
      onChange={e => onQueryChange(toSearchQuery(referenceParts, e.currentTarget.value)) }
    />;
  }
}
