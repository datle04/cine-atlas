import { useQuery } from "@tanstack/react-query";
import * as tmdbService from "@/services/tmdb.service";

export const usePopularPeople = (page = 1) => {
  return useQuery({
    queryKey: ["people", "popular", page],
    queryFn: () => tmdbService.getPopularPeople(page),
  });
};

export const usePersonDetails = (id: string | number) => {
  return useQuery({
    queryKey: ["person", "details", id],
    queryFn: () => tmdbService.getPersonDetails(id),
    enabled: !!id,
  });
};

export const usePersonMovieCredits = (id: string | number) => {
  return useQuery({
    queryKey: ["person", "movie_credits", id],
    queryFn: () => tmdbService.getPersonMovieCredits(id),
    enabled: !!id,
  });
};