import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { getMovieDetails, getMovieReviews } from "@/services/tmdb.service";
import { PageTransition } from "@/components/shared/page-transition";

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function ReviewsPage({ params, searchParams }: ReviewsPageProps) {
  const { id } = await params;
  
  // Đọc số trang từ URL (Mặc định là trang 1)
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // Gọi API lấy thông tin phim và danh sách review theo trang
  const [movie, reviewsData] = await Promise.all([
    getMovieDetails(id),
    getMovieReviews(id, currentPage),
  ]);

  const reviews = reviewsData.results || [];
  const totalPages = reviewsData.total_pages || 1;
  const releaseYear = movie.release_date?.substring(0, 4);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-8 py-24 min-h-screen max-w-5xl">
        
        {/* HEADER */}
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

        {/* Title & Quantity */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">User Reviews</h2>
          </div>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
            {reviewsData.total_results} Reviews
          </span>
        </div>

        {/* List of Reviews */}
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => {
              // Xử lý logic avatar của TMDB
              const avatarPath = review.author_details.avatar_path;
              const avatarUrl = avatarPath 
                ? (avatarPath.startsWith('/') ? `https://image.tmdb.org/t/p/w150_and_h150_face${avatarPath}` : avatarPath.slice(1)) 
                : null;

              return (
                <div key={review.id} className="p-6 rounded-2xl bg-muted/20 border border-border/50 space-y-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    {/* Thông tin User */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl overflow-hidden ring-2 ring-background">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={review.author} className="w-full h-full object-cover" />
                        ) : (
                          review.author.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">A review by {review.author}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Written on {new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Điểm Rating (Badge) */}
                    {review.author_details.rating && (
                      <div className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg shadow-sm shrink-0 self-start sm:self-auto">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-extrabold">{review.author_details.rating}.0</span>
                      </div>
                    )}
                  </div>

                  {/* Nội dung Review */}
                  <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {review.content}
                  </p>
                  
                  {/* Link gốc của TMDB */}
                  <div className="pt-2">
                    <a 
                      href={review.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read on TMDB →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            We don't have any reviews for this movie yet.
          </div>
        )}

        {/* ========================================== */}
        {/* PHÂN TRANG (PAGINATION) */}
        {/* ========================================== */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-border/50">
            {currentPage > 1 ? (
              <Link href={`/movie/${id}/reviews?page=${currentPage - 1}`}>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
              </Link>
            ) : (
              <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground cursor-not-allowed font-medium">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            )}

            <span className="text-sm font-medium text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link href={`/movie/${id}/reviews?page=${currentPage + 1}`}>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            ) : (
              <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground cursor-not-allowed font-medium">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </PageTransition>
  );
}