interface swapiApiResponse<T> {
  results: T[];
}


interface SwapiApiRating {
  Source: string;
  Value: string;
}

interface swapiApiParams {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer?: string;
  release_date: string;
  created?: string;
  edited?: string;
  url?: string;
  characters?: string[];
  planets?: string[];
  species?: string[];
  starships?: string[];

  ratings: rating[]; // for average rating 
  fullName?:string // for modify title to get full name like on the screenshot. and use in filter and omdb api

  [key: string]: any; // for arbitrary string properties, needed in sorting function.


}

export type { swapiApiParams, swapiApiResponse, SwapiApiRating };
