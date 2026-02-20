"use client";

import { MediaCard } from "@/components/shared/media-card";
import { useTrendingMovies } from "@/hooks/queries/use-movies";
import { Movie } from "@/types/tmdb";
import Image from "next/image";

interface TrendingSectionProps {
  initialMovies: Movie[];
}

export function TrendingSection({ initialMovies }: TrendingSectionProps) {
  const { data: movies } = useTrendingMovies(initialMovies);

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-4">Trending Today</h2>
      <div className="flex items-center overflow-x-scroll gap-6">
        {movies?.map((movie) => (
          <div key={movie.id} className="shrink-0 w-[150px] snap-start">
            <MediaCard media={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}