import { useQuery } from "@tanstack/react-query";
import * as tmdbService from "@/services/tmdb.service";

export const usePopularTVShows = (page = 1) => {
  return useQuery({
    queryKey: ["tv", "popular", page],
    queryFn: () => tmdbService.getPopularTVShows(page),
  });
};

export const useTVDetails = (id: string | number) => {
  return useQuery({
    queryKey: ["tv", "details", id],
    queryFn: () => tmdbService.getTVDetails(id),
    enabled: !!id,
  });
};

export const useTVCredits = (id: string | number) => {
  return useQuery({
    queryKey: ["tv", "credits", id],
    queryFn: () => tmdbService.getTVCredits(id),
    enabled: !!id,
  });
};

export const useTVVideos = (id: string | number) => {
  return useQuery({
    queryKey: ["tv", "videos", id],
    queryFn: () => tmdbService.getTVVideos(id),
    enabled: !!id,
  });
};