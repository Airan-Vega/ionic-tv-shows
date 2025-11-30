import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { tabsRoutes, routes } from './tv-shows.routes';

describe('TV Shows Tab Routes', () => {
  let router: Router;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(tabsRoutes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('If I navigate to the empty path, it should redirect to "/tv-shows"', async () => {
    await router.navigate(['tv-shows']);
    expect(location.path()).toBe('/tv-shows');
  });

  it('If I navigate to the "tv-shows" path, it should redirect to "/tv-shows"', async () => {
    await router.navigate(['tv-shows']);
    expect(location.path()).toBe('/tv-shows');
  });

  it('If I navigate to the "search" path, it should redirect to "/search"', async () => {
    await router.navigate(['search']);
    expect(location.path()).toBe('/search');
  });

  it('If I navigate to an unknown path, I should be redirected to "/tv-shows"', async () => {
    await router.navigate(['unknown-page']);
    expect(location.path()).toBe('/tv-shows');
  });
});

describe('TV Shows Routes', () => {
  let router: Router;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('If I navigate to the "detail/1" path, it should redirect to "/detail/1"', async () => {
    await router.navigate(['detail/1']);
    expect(location.path()).toBe('/detail/1');
  });
});
