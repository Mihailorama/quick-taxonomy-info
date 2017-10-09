import { Taxonomy } from '@cfl/bigfoot-search-service';
import * as React from 'react';

import './taxonomy-search.less';

export interface TaxonomySearchProps {
  taxonomies: Taxonomy[];
}

export default function TaxonomySearch(props: TaxonomySearchProps): JSX.Element {
  return (
    <div className='app-TaxonomySearch-container'>
      <div className='app-TaxonomySearch-select'>
        <select> { props.taxonomies.map(t => <option key={t.id}>{t.name}</option>) } </select>
      </div>
      <div className='app-TaxonomySearch-search'>
        <input type='text' />
      </div>
    </div>
  );
}
