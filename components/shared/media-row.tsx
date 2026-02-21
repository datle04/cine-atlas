import { MediaCard } from "@/components/shared/media-card";
import { Movie, TV } from "@/types/tmdb";

interface MediaRowProps {
  title: string;
  items: (Movie | TV)[];
}

export function MediaRow({ title, items }: MediaRowProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight px-4 md:px-0">{title}</h2>
      
      {/* Side scroll */}
      <div className="flex overflow-x-auto gap-4 pb-6 pt-2 px-4 md:px-0 snap-x snap-mandatory hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="shrink-0 w-[140px] md:w-[150px] snap-start">
            <MediaCard 
              media={item} 
              mediaType={"title" in item ? "movie" : "tv"} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}