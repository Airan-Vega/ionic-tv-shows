import { Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

export const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tv-shows",
        loadComponent: () =>
          import("./tv-shows/pages/tv-shows/tv-shows.page").then(
            (m) => m.TvShowsPage
          ),
      },
      {
        path: "search",
        loadComponent: () =>
          import("./search/pages/search.page").then((m) => m.SearchPage),
      },
      {
        path: "favorites",
        loadComponent: () =>
          import("./favorites/pages/favorites.page").then(
            (m) => m.FavoritesPage
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/tv-shows",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/tv-shows",
    pathMatch: "full",
  },
];
