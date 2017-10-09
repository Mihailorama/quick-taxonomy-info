import { isUndefined } from 'util';

import { Taxonomy } from '@cfl/bigfoot-search-service';
import * as React from 'react';

import './taxonomy-search.less';

export interface TaxonomySearchProps {
  taxonomies: Taxonomy[];
  selectedTaxonomy?: number;
  query?: string;
}

export default function TaxonomySearch(props: TaxonomySearchProps): JSX.Element {
  const enabled = !isUndefined(props.selectedTaxonomy);
  return (
    <div className='app-TaxonomySearch-container'>
      <div className='app-TaxonomySearch-select'>
        <select required>
          { enabled || <option disabled selected value=''>Taxonomy</option> }
          { props.taxonomies.map(t => <option key={t.id} value={t.id} selected={props.selectedTaxonomy === t.id}>{t.name}</option>) }
        </select>
      </div>
      <div className={'app-TaxonomySearch-search' + (enabled ? ' enabled' : '')}>
        <input type='text' placeholder='Search' value={props.query}/>
      </div>
    </div>
  );
}
