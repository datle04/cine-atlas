import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies, getMovieReviews, getMovieImages, getMovieAllVideos } from "@/services/tmdb.service";
import { CircularRating } from "@/components/shared/circular-rating";
import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import { Play, Plus, Link as LinkIcon, Facebook, Twitter, Instagram, MoveRight, UserStar } from "lucide-react";
import { TrailerButton } from "@/components/features/movie/trailer-button";
import { MediaCard } from "@/components/shared/media-card"; // Import để dùng cho mục Recommendations
import { MediaSection } from "@/components/features/movie/media-section";

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  

  // Gọi các API song song để lấy đầy đủ dữ liệu
  const [movie, credits, videos, similar, reviewsData, imagesData, allVideos] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
    getMovieVideos(id),
    getSimilarMovies(id),
    getMovieReviews(id),
    getMovieImages(id), 
    getMovieAllVideos(id)
  ]);

  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "";
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";
  const trailer = videos.length > 0 ? videos[0] : null;

  // Format các thông số
  const formatRuntime = (minutes: number) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  const formatCurrency = (amount: number) => amount > 0 ? `$${amount.toLocaleString()}` : "No data";

  // Lọc Đạo diễn và Biên kịch từ mảng Crew
  const directors = credits.crew.filter((c) => c.job === "Director");
  const writers = credits.crew.filter((c) => c.department === "Writing" || c.job === "Screenplay");
  const reviews = reviewsData.results;

  return (
    <PageTransition>
      <div className="w-full flex flex-col min-h-screen">

        {/* Hero Banner */}
        <section className="relative w-full min-h-[75vh] flex items-center pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-muted">
            {backdropUrl && <Image src={backdropUrl} alt={movie.title} fill className="object-cover opacity-20 dark:opacity-30 blur-sm" priority />}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
              
              {/* Poster */}
              <div className="relative w-[220px] md:w-[300px] shrink-0 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                {posterUrl && <Image src={posterUrl} alt={movie.title} fill className="object-cover" priority />}
              </div>

              {/* Banner Info */}
              <div className="flex flex-col flex-1 text-center md:text-left space-y-5 mt-4 md:mt-0">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  {movie.title} <span className="text-muted-foreground font-normal">({movie.release_date?.substring(0, 4)})</span>
                </h1>
                
                {movie.tagline && <p className="text-lg text-muted-foreground italic">"{movie.tagline}"</p>}
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
                  <span className="px-2 py-1 bg-secondary rounded-md border border-border">{formatRuntime(movie.runtime)}</span>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {movie.genres.map(g => g.name).join(" • ")}
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-6 py-2">
                  <div className="flex items-center gap-3">
                    <CircularRating rating={movie.vote_average} className="scale-110 origin-left" />
                    <span className="font-bold text-sm">User<br/>Score</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" size="icon" className="rounded-full w-12 h-12 shadow-md"><Plus className="w-5 h-5" /></Button>
                    <TrailerButton videoKey={trailer?.key} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed md:text-lg max-w-3xl">{movie.overview}</p>
                </div>

                {/* Director & Writer Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 mt-6 border-t border-border/50 max-w-3xl">
                  {directors.length > 0 && (
                    <div>
                      <p className="font-bold text-foreground">{directors.map(d => d.name).join(", ")}</p>
                      <p className="text-sm text-muted-foreground">Director</p>
                    </div>
                  )}
                  {writers.length > 0 && (
                    <div className="col-span-1 md:col-span-2">
                      <p className="font-bold text-foreground line-clamp-1">{writers.slice(0, 3).map(w => w.name).join(", ")}</p>
                      <p className="text-sm text-muted-foreground">Writer</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            
            {/* Left col: Cast, Reviews, Recommendations */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Top Billed Cast */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Top Billed Cast</h2>
                <div className="flex overflow-x-auto gap-4 pb-6 pt-2 custom-scrollbar snap-x snap-mandatory">
                   {credits.cast.slice(0, 10).map((person) => (
                      <div key={person.id} className="w-[140px] md:w-[150px] shrink-0 snap-start bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow group">
                         <div className="relative aspect-[2/3] bg-muted overflow-hidden">
                           {person.profile_path ? (
                             <Image src={`https://image.tmdb.org/t/p/w276_and_h350_face${person.profile_path}`} alt={person.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground bg-secondary">No Image</div>
                           )}
                         </div>
                         <div className="p-3">
                           <p className="font-bold text-sm line-clamp-1">{person.name}</p>
                           <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-tight">{person.character}</p>
                         </div>
                      </div>
                   ))}
                </div>
              </div>

              {/* User Reviews */}
              {reviews && reviews.length > 0 && (
                <div className="space-y-6 border-t border-border/50 pt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">User Reviews</h2>
                    <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                      {reviews.length} {reviews.length > 1 ? 'Reviews' : 'Review'}
                    </span>
                  </div>
                  
                  <div className="grid gap-6">
                    {reviews.slice(0, 2).map((review) => {
                      const avatarPath = review.author_details.avatar_path;
                      const avatarUrl = avatarPath 
                        ? (avatarPath.startsWith('/') ? `https://image.tmdb.org/t/p/w150_and_h150_face${avatarPath}` : avatarPath.slice(1)) 
                        : null;

                      return (
                        <div key={review.id} className="p-5 md:p-6 rounded-2xl bg-muted/20 border border-border/50 space-y-4 shadow-sm">
                          
                          {/* Review Header*/}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl overflow-hidden ring-2 ring-background">
                                {avatarUrl ? (
                                  <img src={avatarUrl} alt={review.author} className="w-full h-full object-cover" />
                                ) : (
                                  review.author.charAt(0).toUpperCase() // Avatar fallback
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-foreground">A review by {review.author}</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Written on {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                              </div>
                            </div>

                            {/* Rating Badge */}
                            {review.author_details.rating && (
                              <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-1 rounded-md shadow-sm shrink-0">
                                <span className="text-sm font-extrabold">★ {review.author_details.rating}.0</span>
                              </div>
                            )}
                          </div>

                          {/* Review content */}
                          <p className="text-sm md:text-base text-foreground/80 leading-relaxed whitespace-pre-wrap line-clamp-4 md:line-clamp-6">
                            {review.content}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )} 

                <div className="px-2">
                    <span className="flex items-end gap-2 text-lg font-semibold underline hover:text-slate-600 dark:hover-text-slate-300 transition-all cursor-pointer">
                        <UserStar /> Read all Reviews 
                    </span>
                </div>

              {/* Media Section */}
              <MediaSection 
                videos={allVideos} 
                backdrops={imagesData.backdrops} 
                posters={imagesData.posters} 
              />
                
              {/* Recommendations */}
              {similar && similar.length > 0 && (
                <div className="space-y-4 border-t pt-8">
                  <h2 className="text-2xl font-bold tracking-tight">Recommendations</h2>
                  <div className="flex overflow-x-auto gap-4 pb-6 pt-2 custom-scrollbar snap-x snap-mandatory">
                    {similar.slice(0, 8).map((simMovie) => (
                      <div key={simMovie.id} className="w-[160px] md:w-[200px] shrink-0 snap-start">
                        <MediaCard media={simMovie} mediaType="movie" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Info, Keyword */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Social Links & Homepage */}
              <div className="flex items-center gap-4">
                {movie.homepage && (
                  <a href={movie.homepage} target="_blank" rel="noreferrer" title="Visit Homepage" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    <LinkIcon className="w-5 h-5" />
                  </a>
                )}
                {/*Social Icons */}
                <a href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Instagram className="w-6 h-6" /></a>
              </div>

              {/* Facts */}
              <div className="space-y-6 bg-muted/30 p-6 rounded-xl border border-border/50">
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">Status</h4>
                  <p className="text-muted-foreground text-sm">{movie.status}</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">Original Language</h4>
                  <p className="text-muted-foreground text-sm uppercase">{movie.original_language}</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">Budget</h4>
                  <p className="text-muted-foreground text-sm">{formatCurrency(movie.budget)}</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">Revenue</h4>
                  <p className="text-muted-foreground text-sm">{formatCurrency(movie.revenue)}</p>
                </div>
              </div>

              {/* Keywords / Tags */}
              <div className="space-y-3">
                <h4 className="font-bold text-foreground">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {["blockbuster", "action", "hero", "sequel"].map((keyword, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium border border-border/50 hover:bg-muted cursor-pointer transition-colors">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}