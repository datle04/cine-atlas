import { tmdbClient } from "@/lib/tmdb-client";
import { Movie, TMDBResponse, TV } from "@/types/tmdb";

export const getTrendingMovies = async (timeWindow: "day" | "week" = "day") => {
  const { data } = await tmdbClient.get<TMDBResponse<Movie>>(`/trending/movie/${timeWindow}`);
  return data.results;
};

export const getPopularMovies = async () => {
  const { data } = await tmdbClient.get<TMDBResponse<Movie>>("/movie/popular");
  return data.results;
};

export const searchMulti = async (query: string) => {
  if (!query) return [];
  const { data } = await tmdbClient.get<TMDBResponse<any>>("/search/multi", {
    params: { 
      query, 
      include_adult: false,
    },
  });

  return data.results
};

export const getTopRatedMovies = async () => {
  const { data } = await tmdbClient.get<TMDBResponse<Movie>>("/movie/top_rated");
  return data.results;
};

export const getPopularTVShows = async () => {
  const { data } = await tmdbClient.get<TMDBResponse<TV>>("/tv/popular");
  return data.results;
};