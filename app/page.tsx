import { getTopRatedMovies, getPopularTVShows, getTrending } from "@/services/tmdb.service";
import { HeroSection } from "@/components/features/home/hero-section";
import { TrendingSection, TopRatedSection, PopularTVSection } from "@/components/features/home/media-sections";
import { PageTransition } from "@/components/shared/page-transition";
import { Movie } from "@/types/tmdb"; 

export default async function HomePage() {
  const [trendingData, topRatedData, popularTVData] = await Promise.all([
    getTrending('movie', 'week'), 
    getTopRatedMovies(),         
    getPopularTVShows(),          
  ]);

  const trendingMovies = trendingData as Movie[];
  const heroMovie = trendingMovies[0];
  const trendingScroll = trendingMovies.slice(1);

  return (
    <PageTransition>
      <div className="w-full flex flex-col space-y-10 pb-20">
        
        <HeroSection movie={heroMovie} />

        <div className="w-full max-w-7xl mx-auto space-y-12 mt-4">
          <TrendingSection initialData={trendingScroll} />
          <TopRatedSection initialData={topRatedData.results} />
          <PopularTVSection initialData={popularTVData.results} />
        </div>

      </div>
    </PageTransition>
  );
}