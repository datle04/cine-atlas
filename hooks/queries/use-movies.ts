import { getPopularMovies, getPopularTVShows, getTopRatedMovies, getTrendingMovies } from "@/services/tmdb.service"
import { Movie, TV } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query"

export const useTrendingMovies = (initialData?: Movie[]) => {
    return useQuery({
        queryKey: ["movies", "trending"],
        queryFn: () => getTrendingMovies(),
        initialData: initialData, 
    });
};

export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: () => getPopularMovies()
    })
}

export const useTopRatedMovies = (initialData?: Movie[]) => {
  return useQuery({
    queryKey: ["movies", "top_rated"],
    queryFn: getTopRatedMovies,
    initialData: initialData,
  });
};

export const usePopularTVShows = (initialData?: TV[]) => {
  return useQuery({
    queryKey: ["tv", "popular"],
    queryFn: getPopularTVShows,
    initialData: initialData,
  });
};