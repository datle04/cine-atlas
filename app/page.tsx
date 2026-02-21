import { getTrendingMovies } from "@/services/tmdb.service";
import { TrendingSection } from "@/components/features/home/trending-section";
import { PageTransition } from "@/components/shared/page-transition";
import { HeroSection } from "@/components/features/home/hero-section";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();

  // Tách bộ phim hot nhất làm ảnh bìa
  const heroMovie = trendingMovies[0];
  
  // Các phim còn lại đưa vào danh sách cuộn
  const scrollMovies = trendingMovies.slice(1);

  return (
   <PageTransition>
      {/* Xóa class padding thừa, để Hero chiếm trọn màn hình */}
      <div className="w-full flex flex-col space-y-10 pb-20">
        
        {/* Banner khổng lồ với hiệu ứng Light Rays */}
        <HeroSection movie={heroMovie} />

        {/* Các dải phim nằm bên dưới */}
        <div className="container mx-auto px-4 space-y-12">
          {/* Sửa lại prop thành scrollMovies */}
          <TrendingSection initialMovies={scrollMovies} />
          
          {/* Sau này bạn có thể gọi thêm getPopularMovies() và tái sử dụng TrendingSection để làm các dải tiếp theo */}
        </div>

      </div>
    </PageTransition>
  );
}