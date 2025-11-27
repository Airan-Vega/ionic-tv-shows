import { TvShowShow, TvShowsInterface } from "../interfaces";
import { TVShowsModel } from "../models";

export class TvShowsMapper {
  static mapShow(show: TvShowShow): TVShowsModel {
    return {
      id: show.id,
      name: show.name,
      type: show.type,
      language: show.language,
      genres: show.genres,
      status: show.status,
      premiered: show.premiered,
      rating: show.rating,
      ended: show?.ended,
      image: show.image?.medium,
      summary: show?.summary,
    };
  }

  static mapTvShowArray(tvShows: TvShowsInterface[]): TVShowsModel[] {
    return tvShows.map(({ show }) => this.mapShow(show));
  }
}
