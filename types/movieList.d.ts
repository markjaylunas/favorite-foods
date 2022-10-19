export type MovieItem = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  phone?: string;
};

type MovieList = MovieItem[];

export default MovieList;
