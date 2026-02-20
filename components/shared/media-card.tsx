import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { CircularRating } from "./circular-rating";
import { Movie, TV } from "@/types/tmdb";
import { Button } from "@/components/ui/button";

interface MediaCardProps {
  media: Movie | TV;
  mediaType?: "movie" | "tv"; 
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "Unknown Date";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function MediaCard({ media, mediaType = "movie" }: MediaCardProps) {
  const title = "title" in media ? media.title : media.name;
  const date = "release_date" in media ? media.release_date : media.first_air_date;
  const href = `/${mediaType}/${media.id}`;

  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="flex flex-col group w-full"> 
      
      {/* Image & Badge Wrapper*/}
      <div className="relative mb-5"> 
        
        {/* Poster Image Container */}
        <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-md bg-muted">
          <Link href={href}>
            <Image
              src={posterUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
          </Link>

          {/* Options Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 w-7 h-7 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4 text-foreground" />
          </Button>
        </div>

        {/*Rating Badge */}
        <div className="absolute -bottom-5 left-3">
          <CircularRating rating={media.vote_average} />
        </div>
        
      </div>

      {/* Text Info */}
      <div className="flex flex-col px-1 mt-2">
        <Link href={href} className="font-bold text-sm leading-tight hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
          {title}
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}