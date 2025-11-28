import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  TvShowShow,
  TvShowsInterface,
  TvShowsSearchInterface,
} from '../interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TvShowsMapper } from '../mappers';
import { TVShowsModel } from '../models';

const baseUrl = environment.baseApiTvShowUrl;
const COUNTRY = 'US';
const DATE = '2014-12-01';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  private http = inject(HttpClient);

  getTvShows(): Observable<TVShowsModel[]> {
    return this.http
      .get<TvShowsInterface[]>(`${baseUrl}/schedule`, {
        params: {
          country: COUNTRY,
          date: DATE,
        },
      })
      .pipe(
        map((tvShows) => TvShowsMapper.mapTvShowArray(tvShows)),
        catchError((error: HttpErrorResponse) => {
          console.log('Error fetching ', error);

          return throwError(
            () => new Error(`TV programs from ${DATE} cannot be obtained.`)
          );
        })
      );
  }

  getTvShow(id: number): Observable<TVShowsModel> {
    return this.http.get<TvShowShow>(`${baseUrl}/shows/${id}`).pipe(
      map((tvShow) => TvShowsMapper.mapShow(tvShow)),
      catchError((error: HttpErrorResponse) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error('The data for this show could not be loaded')
        );
      })
    );
  }

  searchTvShow(name: string) {
    return this.http
      .get<TvShowsSearchInterface[]>(`${baseUrl}/search/shows`, {
        params: {
          q: name,
        },
      })
      .pipe(
        map((tvShows) => tvShows.map(({ show }) => show)),
        map((shows) => TvShowsMapper.mapShowArray(shows)),
        catchError((error: HttpErrorResponse) => {
          console.log('Error fetching ', error);

          return throwError(
            () => new Error('The data for this search could not be loaded.')
          );
        })
      );
  }
}
