"use client";

import { MediaRow } from "@/components/shared/media-row";
import { useTrendingMovies, useTopRatedMovies } from "@/hooks/queries/use-movies";
import { usePopularTVShows } from "@/hooks/queries/use-tv";
import { Movie, TV } from "@/types/tmdb";

export function TrendingSection({ initialData }: { initialData: Movie[] }) {
  const { data } = useTrendingMovies();
  const items = (data as Movie[]) || initialData || [];

  return <MediaRow title="Trending Movies" items={items} />;
}

export function TopRatedSection({ initialData }: { initialData: Movie[] }) {
  const { data } = useTopRatedMovies(1);
  const items = data?.results || initialData || [];

  return <MediaRow title="Top Rated Movies" items={items} />;
}

export function PopularTVSection({ initialData }: { initialData: TV[] }) {
  const { data } = usePopularTVShows(1);
  const items = data?.results || initialData || [];

  return <MediaRow title="Popular TV Shows" items={items} />;
}