import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tv-shows',
    loadChildren: () =>
      import('@/app/features/tv-shows/tv-shows.routes').then((m) => m.routes),
  },
];
