export interface TvShowsInterface {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number | null;
  type: Type;
  airdate: Date;
  airtime: string;
  airstamp: Date;
  runtime: number | null;
  rating: Rating;
  image: Image | null;
  summary: null | string;
  show: TvShowShow;
  _links: TvShowLinks;
}

export interface TvShowsSearchInterface {
  score: number;
  show: TvShowShow;
}

export interface TvShowLinks {
  self: Self;
  show: NextepisodeClass;
}

export interface Self {
  href: string;
}

export interface NextepisodeClass {
  href: string;
  name: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Rating {
  average: number | null;
}

export interface TvShowShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: Language;
  genres: string[];
  status: Status;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: Date;
  ended: Date | null;
  officialSite: null | string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: Network | null;
  dvdCountry: Country | null;
  externals: Externals;
  image: Image | null;
  summary: null | string;
  updated: number;
  _links: ShowLinks;
}

export interface ShowLinks {
  self: Self;
  previousepisode: NextepisodeClass;
  nextepisode?: NextepisodeClass;
}

export interface Country {
  name: Name;
  code: Code;
  timezone: Timezone;
}

export enum Code {
  Us = 'US',
}

export enum Name {
  UnitedStates = 'United States',
}

export enum Timezone {
  AmericaNewYork = 'America/New_York',
}

export interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: null | string;
}

export type Language = 'English' | 'Spanish';

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: null | string;
}

export interface Schedule {
  time: string;
  days: Day[];
}

export enum Day {
  Friday = 'Friday',
  Monday = 'Monday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Thursday = 'Thursday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
}

export type Status = 'Ended' | 'Running' | 'To Be Determined';

export enum Type {
  InsignificantSpecial = 'insignificant_special',
  Regular = 'regular',
}
