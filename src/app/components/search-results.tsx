import * as React from 'react';

import './search-results.less';
import { ConceptSearchMatch } from '@cfl/bigfoot-search-service';

export interface SearchResultsProps {
  results: ConceptSearchMatch[];
}

export default function SearchResults({results}: SearchResultsProps): JSX.Element {
  return (
    <div className='app-SearchResults-table'>
      <table>
        <thead>
          <th></th>
          <th>Local Name</th>
          <th>Concept</th>
        </thead>
        <tbody>
          {results.map(t => <tr>
            <td className='app-SearchResults-link-holder'><a className='app-SearchResults-link' href={t.conceptHref}></a></td>
            <td>{t.localName}</td>
            <td>{t.label}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
