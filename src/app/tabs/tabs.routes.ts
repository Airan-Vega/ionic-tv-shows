import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../features/tv-shows/tv-shows.routes').then(
            (m) => m.tabsRoutes
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full',
  },
];
