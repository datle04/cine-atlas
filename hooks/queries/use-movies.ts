import { getPopularMovies, getTrendingMovies } from "@/services/tmdb.service"
import { Movie } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query"

export const useTrendingMovies = (initialData?: Movie[]) => {
    return useQuery({
        queryKey: ["movies", "trending"],
        queryFn: () => getTrendingMovies(),
        initialData: initialData, // Nhận dữ liệu từ Server Component
    });
};

export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: () => getPopularMovies()
    })
}