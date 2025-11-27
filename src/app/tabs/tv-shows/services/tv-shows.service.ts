import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@/environments/environment";
import { TvShowShow, TvShowsInterface } from "../interfaces";
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
        catchError((error: HttpErrorResponse) => {
          console.log("Error fetching ", error);

          return throwError(
            () => new Error(`TV programs from ${DATE} cannot be obtained.`)
          );
        })
      );
  }

  getTvShow(id: number) {
    return this.http.get<TvShowShow>(`${baseUrl}/shows/${id}`).pipe(
      map((tvShows) => TvShowsMapper.mapShow(tvShows)),
      catchError((error: HttpErrorResponse) => {
        console.log("Error fetching ", error);

        return throwError(
          () => new Error("The data for this show could not be loaded")
        );
      })
    );
  }
}
