import { getTrendingMovies, getTopRatedMovies, getPopularTVShows } from "@/services/tmdb.service";
import { HeroSection } from "@/components/features/home/hero-section";
import { TrendingSection, TopRatedSection, PopularTVSection } from "@/components/features/home/media-sections";
import { PageTransition } from "@/components/shared/page-transition";

export default async function HomePage() {
  // BÍ QUYẾT TỐI ƯU HIỆU SUẤT: Gọi 3 API song song cùng 1 lúc
  const [trendingMovies, topRatedMovies, popularTVShows] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies(),
    getPopularTVShows(),
  ]);

  // Bộ phim hot nhất làm nền Hero
  const heroMovie = trendingMovies[0];
  // Phần còn lại của trending
  const trendingScroll = trendingMovies.slice(1);

  return (
    <PageTransition>
      <div className="w-full flex flex-col space-y-10 pb-20">
        
        <HeroSection movie={heroMovie} />

        {/* Các dải phim nằm bên dưới */}
        {/* max-w-7xl mx-auto giúp các hàng phim thẳng hàng với Hero Section */}
        <div className="w-full max-w-7xl mx-auto space-y-12 mt-4">
          <TrendingSection initialData={trendingScroll} />
          <TopRatedSection initialData={topRatedMovies} />
          <PopularTVSection initialData={popularTVShows} />
        </div>

      </div>
    </PageTransition>
  );
}