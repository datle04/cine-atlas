import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMovieDetails, getMovieImages } from "@/services/tmdb.service";
import { PageTransition } from "@/components/shared/page-transition";

interface PostersPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostersPage({ params }: PostersPageProps) {
  const { id } = await params;

  // Gọi API lấy chi tiết phim (để lấy Tên phim) và toàn bộ hình ảnh
  const [movie, imagesData] = await Promise.all([
    getMovieDetails(id),
    getMovieImages(id),
  ]);

  const posters = imagesData.posters || [];
  const releaseYear = movie.release_date?.substring(0, 4);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-8 py-24 min-h-screen">
        
        {/* HEADER: Nút quay lại và Tiêu đề phim */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 pb-6 border-b border-border/50">
          {movie.poster_path && (
            <div className="relative w-16 md:w-20 aspect-[2/3] rounded-md overflow-hidden shadow-md shrink-0">
              <Image 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title} 
                fill 
                className="object-cover" 
              />
            </div>
          )}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {movie.title} <span className="text-muted-foreground font-normal">({releaseYear})</span>
            </h1>
            <Link 
              href={`/movie/${id}`} 
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to main
            </Link>
          </div>
        </div>

        {/* TIÊU ĐỀ MỤC & SỐ LƯỢNG */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Posters</h2>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
            {posters.length} Images
          </span>
        </div>

        {/* LƯỚI HÌNH ẢNH (GRID) */}
        {posters.length > 0 ? (
          <div className="grid sgrid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {posters.map((image, idx) => (
              <div 
                key={idx} 
                className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted shadow-sm group border border-border/50"
              >
                <Image 
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`} 
                  alt={`Backdrop ${idx + 1}`} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Lớp phủ mờ hiển thị kích thước ảnh khi Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-medium text-sm">
                    {image.width} x {image.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            No posters available for this movie.
          </div>
        )}

      </div>
    </PageTransition>
  );
}