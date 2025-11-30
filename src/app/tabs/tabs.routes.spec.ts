import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './tabs.routes';

describe('Tabs Routes', () => {
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
});
