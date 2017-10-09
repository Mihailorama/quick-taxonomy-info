import { Taxonomy } from '@cfl/bigfoot-search-service';
import * as React from 'react';

export interface SearchFormProps {
  taxonomies?: Taxonomy[];
}

export default function SearchForm({ taxonomies }: SearchFormProps): JSX.Element {
  return (
    <p> {taxonomies ? taxonomies.length : '…'} </p>
  );
}
