import { Language, Rating, Status } from "../interfaces";

export interface TVShowsModel {
  id: number;
  name: string;
  type: string;
  language: Language;
  genres: string[];
  status: Status;
  premiered: Date;
  rating: Rating;
  ended?: Date | null;
  image?: string | null;
  summary?: string | null;
}
