/* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component';
    const applicationImports = {
      0: () => import('./pages/about-page'),
1: () => import('./pages/chart-page'),
2: () => import('./pages/dashboard-page'),
3: () => import('./pages/market-list-page'),
4: () => import('./pages/not-found-page'),
    };
    assignImportedComponents(applicationImports);
    export default applicationImports;