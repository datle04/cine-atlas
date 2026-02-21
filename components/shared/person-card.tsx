import Image from "next/image";
import Link from "next/link";
import { Person } from "@/types/tmdb"; // Đảm bảo bạn đã khai báo Person interface ở bài trước

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : "https://via.placeholder.com/500x500?text=No+Image";

  return (
    <div className="flex flex-col gap-3 group text-center w-full">
      {/* Khung ảnh tỷ lệ 1:1 (Vuông/Tròn) */}
      <div className="relative aspect-square w-full max-w-[150px] mx-auto rounded-full overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-md bg-muted">
        <Link href={`/person/${person.id}`}>
          <Image
            src={imageUrl}
            alt={person.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </Link>
      </div>

      {/* Thông tin Text */}
      <div className="flex flex-col px-1">
        <Link href={`/person/${person.id}`} className="font-bold text-sm leading-tight hover:text-primary transition-colors line-clamp-1">
          {person.name}
        </Link>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {person.known_for_department}
        </p>
      </div>
    </div>
  );
}