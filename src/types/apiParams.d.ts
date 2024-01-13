interface ApiParams {
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

//reuse in other files
export type { ApiParams };
