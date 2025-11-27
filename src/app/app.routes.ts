import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tv-show-detail/:id',
    loadComponent: () =>
      import('./tabs/tv-shows/pages/tv-show-detail/tv-show-detail.page').then(
        (m) => m.TvShowDetailPage
      ),
  },
];
