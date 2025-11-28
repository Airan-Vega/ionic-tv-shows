import { Routes } from '@angular/router';

export const tabsRoutes: Routes = [
  {
    path: 'tv-shows',
    loadComponent: () =>
      import('@/app/features/tv-shows/pages/list/list.page').then(
        (m) => m.ListPage
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('@/app/features/tv-shows/pages/search/search.page').then(
        (m) => m.SearchPage
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('@/app/features/tv-shows/pages/favorites/favorites.page').then(
        (m) => m.FavoritesPage
      ),
  },
  {
    path: '',
    redirectTo: 'tv-shows',
    pathMatch: 'full',
  },
];

export const routes: Routes = [
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('@/app/features/tv-shows/pages/detail/detail.page').then(
        (m) => m.DetailPage
      ),
  },
  {
    path: '',
    redirectTo: '/tabs/tv-shows',
    pathMatch: 'full',
  },
];
