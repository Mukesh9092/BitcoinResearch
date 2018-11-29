/* eslint-disable */ 
    import {assignImportedComponents} from 'react-imported-component';
    const applicationImports = {
      0: () => import('./pages/market-list-page'),
1: () => import('./pages/about-page'),
2: () => import('./pages/not-found-page'),
3: () => import('./pages/dashboard-page'),
    };
    assignImportedComponents(applicationImports);
    export default applicationImports;