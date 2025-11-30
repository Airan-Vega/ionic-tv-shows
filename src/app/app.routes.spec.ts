import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';

describe('App Routes', () => {
  let router: Router;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('If I navigate to the empty path, it should redirect to "/tabs/tv-shows"', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/tabs/tv-shows');
  });

  it('If I navigate to the "tv-shows" path, it should redirect to "/tabs/tv-shows"', async () => {
    await router.navigate(['tv-shows']);
    expect(location.path()).toBe('/tabs/tv-shows');
  });

  it('If I navigate to an unknown path, I should be redirected to "/tabs/tv-shows"', async () => {
    await router.navigate(['unknown-page']);
    expect(location.path()).toBe('/tabs/tv-shows');
  });
});
