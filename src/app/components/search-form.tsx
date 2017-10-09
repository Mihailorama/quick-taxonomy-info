import { Taxonomy } from '@cfl/bigfoot-search-service';
import * as React from 'react';
import TaxonomySearch from './taxonomy-search';
import SearchResults from './search-results';

import './search-form.less';

export interface SearchFormProps {
  taxonomies?: Taxonomy[];
}

export default function SearchForm({ taxonomies }: SearchFormProps): JSX.Element {
  return (
    <div className='app-SearchForm-rectangle'>
      {taxonomies ? <TaxonomySearch taxonomies={taxonomies}/> : 'Loading ….'}
      <SearchResults results={[]}/>
    </div>
  );
}
