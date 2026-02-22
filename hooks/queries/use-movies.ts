import * as tmdbService from "@/services/tmdb.service";
import { Movie, TV } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query"

export const useTrendingMovies = (initialData?: Movie[]) => {
    return useQuery({
        queryKey: ["movies", "trending","week"],
        queryFn: () => tmdbService.getTrending('movie', 'week'),
        initialData: initialData, 
    });
};

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => tmdbService.getPopularMovies(page),
  });
};

export const useTopRatedMovies = (page = 1) => {
  return useQuery({
    queryKey: ["movies", "top_rated", page],
    queryFn: () => tmdbService.getTopRatedMovies(page),
  });
};

export const useMovieDetails = (id: string | number) => {
  return useQuery({
    queryKey: ["movie", "details", id],
    queryFn: () => tmdbService.getMovieDetails(id),
    enabled: !!id, // Only called if id is valid
  });
};

export const useMovieCredits = (id: string | number) => {
  return useQuery({
    queryKey: ["movie", "credits", id],
    queryFn: () => tmdbService.getMovieCredits(id),
    enabled: !!id,
  });
};

export const useMovieVideos = (id: string | number) => {
  return useQuery({
    queryKey: ["movie", "videos", id],
    queryFn: () => tmdbService.getMovieVideos(id),
    enabled: !!id,
  });
};

export const useSimilarMovies = (id: string | number) => {
  return useQuery({
    queryKey: ["movie", "similar", id],
    queryFn: () => tmdbService.getSimilarMovies(id),
    enabled: !!id,
  });
};
