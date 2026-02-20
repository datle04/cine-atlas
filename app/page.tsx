import { getTrendingMovies } from "@/services/tmdb.service";
import { TrendingSection } from "@/components/features/home/trending-section";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <TrendingSection initialMovies={trendingMovies} />
    </div>
  );
}