"use client";

import { useTrendingMovies, useTopRatedMovies, usePopularTVShows } from "@/hooks/queries/use-movies";
import { MediaRow } from "@/components/shared/media-row";
import { Movie, TV } from "@/types/tmdb";

export function TrendingSection({ initialData }: { initialData: Movie[] }) {
  const { data } = useTrendingMovies(initialData);
  return <MediaRow title="Trending Today" items={data || []} />;
}

export function TopRatedSection({ initialData }: { initialData: Movie[] }) {
  const { data } = useTopRatedMovies(initialData);
  return <MediaRow title="Top Rated Movies" items={data || []} />;
}

export function PopularTVSection({ initialData }: { initialData: TV[] }) {
  const { data } = usePopularTVShows(initialData);
  return <MediaRow title="Popular TV Shows" items={data || []} />;
}