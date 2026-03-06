import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Video as VideoIcon } from "lucide-react";
import { getMovieDetails, getMovieAllVideos, getMovieTranslations } from "@/services/tmdb.service";
import { PageTransition } from "@/components/shared/page-transition";
import { LanguageSidebar } from "@/components/features/movie/language-sidebar";

interface VideosPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ language?: string }>;
}

export default async function VideosPage({ params, searchParams }: VideosPageProps) {
  const { id } = await params;

    const resolvedSearchParams = await searchParams;
    const currentLanguage = resolvedSearchParams.language || "en";

  // Gọi API lấy thông tin phim và toàn bộ video
  const [movie, allVideos, translationsData] = await Promise.all([
    getMovieDetails(id),
    getMovieAllVideos(id, currentLanguage),
    getMovieTranslations(id),
  ]);

  const availableLanguages = translationsData.map(t => ({
    code: t.iso_639_1,
    name: t.english_name || t.name,
  }));

  // Chỉ lọc lấy các video được lưu trữ trên YouTube
  const youtubeVideos = allVideos?.filter((v) => v.site === "YouTube") || [];
  const releaseYear = movie.release_date?.substring(0, 4);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-8 py-24 min-h-screen">

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

        {/* ========================================== */}
        {/* BỐ CỤC MỚI: SIDEBAR TRÁI - NỘI DUNG PHẢI */}
        {/* ========================================== */}
        <div className="flex flex-col md:flex-row gap-8 items-start">

            <LanguageSidebar availableLanguages={availableLanguages}/>

            <div className="flex-1 w-full space-y-8">
                <div className="flex items-center justify-between mb-8">
                    {/* Title & Quantity*/}
                    <div className="flex items-center gap-2">
                        <VideoIcon className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold">Videos</h2>
                    </div>
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
                        {youtubeVideos.length} Videos
                    </span>
                    </div>

                    {/* Video Grid */}
                    {youtubeVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {youtubeVideos.map((video) => (
                        <div key={video.id} className="flex flex-col gap-3 group">
                            
                            {/* Iframe frame */}
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md border border-border/50 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:ring-1 group-hover:ring-primary/50">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.key}?rel=0&modestbranding=1`}
                                title={video.name}
                                loading="lazy" // this is a "must" to avoid crashing
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full border-0"
                            />
                            </div>

                            {/* Video info*/}
                            <div className="px-1 space-y-1.5">
                            <h3 className="font-bold text-foreground line-clamp-2 leading-snug">
                                {video.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md uppercase tracking-wider">
                                {video.type}
                                </span>
                                {video.official && (
                                <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                    ✓ Official
                                </span>
                                )}
                            </div>
                            </div>

                        </div>
                        ))}
                    </div>
                    ) : (
                    <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                        No videos available for this movie.
                    </div>
                    )}
            </div>

        </div>

      </div>
    </PageTransition>
  );
}