import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPage } from './list.page';
import { TvShowsService } from '../../services/tv-shows.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Genres } from '../../constants';
import { TVShowsModel } from '../../models';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi()), TvShowsService],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create list page', () => {
    expect(component).toBeTruthy();
  });

  it('Should clear gender filter and call filter() when "Clear Filter" handler is called', () => {
    const filterSpy = spyOn(component as any, 'filter');

    const clearButton = component.genderActionSheetButtons[0];
    clearButton.handler?.();

    expect(component.selectedGender()).toBeNull();
    expect(filterSpy).toHaveBeenCalledTimes(1);
  });

  it('Should set selected gender and call filter() for each genre button', () => {
    const filterSpy = spyOn(component as any, 'filter');

    for (let i = 0; i < Genres.length; i++) {
      const genre = Genres[i];
      const genreButton = component.genderActionSheetButtons[i + 1];

      filterSpy.calls.reset();

      genreButton.handler?.();

      expect(component.selectedGender()).toBe(genre.text);
      expect(filterSpy).toHaveBeenCalledTimes(1);
    }
  });

  it('In gender should not call filter() when "Cancel" button is pressed', () => {
    const filterSpy = spyOn(component as any, 'filter');

    const cancelButton =
      component.genderActionSheetButtons[
        component.genderActionSheetButtons.length - 1
      ];

    if (cancelButton.handler) {
      cancelButton.handler();
    }

    expect(filterSpy).not.toHaveBeenCalled();
  });

  it('Should filter tvShows by selected gender', () => {
    const mockTvShows = [
      { id: 1, name: 'Show A', genres: ['Drama', 'Crime'] },
      { id: 2, name: 'Show B', genres: ['Comedy'] },
      { id: 3, name: 'Show C', genres: ['Drama', 'Sci-Fi'] },
    ] as any[];

    component.filteredTvShows.set(mockTvShows);
    component.selectedGender.set('Drama');

    (component as any).filterByGender();

    const result = component.filteredTvShows();
    expect(result.length).toBe(2);
    expect(result).toEqual([
      jasmine.objectContaining({ name: 'Show A' }),
      jasmine.objectContaining({ name: 'Show C' }),
    ]);
  });

  it('Should return empty array if no show matches the selected gender', () => {
    const mockTvShows: TVShowsModel[] = [
      {
        id: 1,
        name: 'Show A',
        type: '',
        genres: ['Comedy'],
        status: 'Ended',
        language: 'English',
        premiered: undefined,
        rating: undefined,
        ended: undefined,
        image: undefined,
        summary: undefined,
      },
      {
        id: 2,
        name: 'Show B',
        type: '',
        genres: ['Action'],
        status: 'Ended',
        language: 'English',
        premiered: undefined,
        rating: undefined,
        ended: undefined,
        image: undefined,
        summary: undefined,
      },
    ];

    component.filteredTvShows.set(mockTvShows);
    component.selectedGender.set('Drama');

    (component as any).filterByGender();

    expect(component.filteredTvShows()).toEqual([]);
  });
});
