import { getPopularMovies, getTrendingMovies } from "@/services/tmdb.service"
import { useQuery } from "@tanstack/react-query"

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ['movies', 'trending'],
        queryFn: () => getTrendingMovies("day")
    });
};

export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: () => getPopularMovies()
    })
}