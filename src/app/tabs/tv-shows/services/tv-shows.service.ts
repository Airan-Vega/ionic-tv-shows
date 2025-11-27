import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@/environments/environment";
import { TvShowsInterface } from "../interfaces";
import { catchError, map, Observable, throwError } from "rxjs";
import { TvShowsMapper } from "../mappers";
import { TVShowsModel } from "../models";

const baseUrl = environment.baseApiTvShowUrl;
const COUNTRY = "US";
const DATE = "2014-12-01";

@Injectable({
  providedIn: "root",
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
        catchError((error) => {
          console.log("Error fetching ", error);

          return throwError(
            () => new Error(`TV programs from ${DATE} cannot be obtained.`)
          );
        })
      );
  }
}
