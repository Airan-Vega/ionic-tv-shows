import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPage } from './search.page';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TvShowsService } from '../../services/tv-shows.service';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let mockTvShowsService: jasmine.SpyObj<TvShowsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TvShowsService, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockTvShowsService = jasmine.createSpyObj('TvShowsService', [
      'searchTvShow',
    ]);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('Should create search page', () => {
    expect(component).toBeTruthy();
  });

  it('Should clear rows and not call service when value is empty string', () => {
    component.setupSearch('');

    expect(component.searchValue()).toBe('');
    expect(component.tvShowsFirstRow()).toEqual([]);
    expect(component.tvShowsSecondRow()).toEqual([]);
    expect(mockTvShowsService.searchTvShow).not.toHaveBeenCalled();
  });

  it('Should clear rows and not call service when value is only whitespace', () => {
    component.setupSearch('   ');

    expect(component.searchValue()).toBe('   ');
    expect(component.tvShowsFirstRow()).toEqual([]);
    expect(component.tvShowsSecondRow()).toEqual([]);
    expect(mockTvShowsService.searchTvShow).not.toHaveBeenCalled();
  });

  it('Should clear rows and not call service when value is null-like (e.g., undefined as string)', () => {
    component.setupSearch(undefined as unknown as string); // forzado

    expect(component.searchValue()).toBe(undefined as any);
    expect(component.tvShowsFirstRow()).toEqual([]);
    expect(component.tvShowsSecondRow()).toEqual([]);
    expect(mockTvShowsService.searchTvShow).not.toHaveBeenCalled();
  });
});
