interface swapiApiResponse<T> {
  results: T[];
}

interface swapiApiParams {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  created: string;
  edited: string;
  url: string;
  characters: string[]; 
  planets: string[];
  species: string[];
  starships: string[];
}

export type { swapiApiParams, swapiApiResponse };
