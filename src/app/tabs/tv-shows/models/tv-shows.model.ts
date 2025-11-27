import { Language, Rating, Status } from "../interfaces";

export interface TVShowsModel {
  id: number;
  name: string;
  type: string;
  genres: string[];
  status: Status;
  language?: Language;
  premiered?: Date;
  rating?: Rating;
  ended?: Date | null;
  image?: string | null;
  summary?: string | null;
}
