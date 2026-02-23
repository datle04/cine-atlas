"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Video, ImageItem } from "@/types/tmdb";

interface MediaSectionProps {
  videos: Video[];
  backdrops: ImageItem[];
  posters: ImageItem[];
}

type TabType = "popular" | "videos" | "backdrops" | "posters";

export function MediaSection({ videos, backdrops, posters }: MediaSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("popular");

  // Lấy ra các video từ YouTube
  const youtubeVideos = videos.filter((v) => v.site === "YouTube");
  
  // Tab "Most Popular" sẽ kết hợp 3 video đầu tiên và 5 backdrop đầu tiên
  const popularItems = [
    ...youtubeVideos.slice(0, 3).map(v => ({ type: 'video', data: v })),
    ...backdrops.slice(0, 5).map(b => ({ type: 'backdrop', data: b }))
  ];

  const renderTabs = () => (
    <div className="flex items-center gap-6 border-b border-border/50 pb-2 mb-4 overflow-x-auto hide-scrollbar">
      <h3 className="text-xl font-bold mr-4">Media</h3>
      
      <button 
        onClick={() => setActiveTab("popular")}
        className={`font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "popular" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        Most Popular
        {activeTab === "popular" && <div className="absolute -bottom-[9px] left-0 w-full h-1 bg-foreground rounded-t-md" />}
      </button>

      <button 
        onClick={() => setActiveTab("videos")}
        className={`font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "videos" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        Videos <span className="opacity-60 text-xs ml-1">{youtubeVideos.length}</span>
        {activeTab === "videos" && <div className="absolute -bottom-[9px] left-0 w-full h-1 bg-foreground rounded-t-md" />}
      </button>

      <button 
        onClick={() => setActiveTab("backdrops")}
        className={`font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "backdrops" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        Backdrops <span className="opacity-60 text-xs ml-1">{backdrops.length}</span>
        {activeTab === "backdrops" && <div className="absolute -bottom-[9px] left-0 w-full h-1 bg-foreground rounded-t-md" />}
      </button>

      <button 
        onClick={() => setActiveTab("posters")}
        className={`font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "posters" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        Posters <span className="opacity-60 text-xs ml-1">{posters.length}</span>
        {activeTab === "posters" && <div className="absolute -bottom-[9px] left-0 w-full h-1 bg-foreground rounded-t-md" />}
      </button>
    </div>
  );

  return (
    <div className="space-y-4 pt-8 border-t border-border/50">
      {renderTabs()}

      {/* KHUNG CUỘN NỘI DUNG */}
      <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar snap-x snap-mandatory rounded-xl">
        
        {/* Render Tab: Most Popular */}
        {activeTab === "popular" && popularItems.map((item, idx) => {
          if (item.type === 'video') {
            const video = item.data as Video;
            return (
              <a key={`pop-vid-${video.id}`} href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noreferrer" className="relative w-[300px] md:w-[500px] shrink-0 aspect-video snap-start group overflow-hidden rounded-lg bg-black">
                <Image src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={video.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-black/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white text-white" />
                  </div>
                </div>
              </a>
            );
          } else {
            const backdrop = item.data as ImageItem;
            return (
              <div key={`pop-bg-${idx}`} className="relative w-[300px] md:w-[500px] shrink-0 aspect-video snap-start overflow-hidden rounded-lg bg-muted">
                <Image src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2${backdrop.file_path}`} alt="Backdrop" fill className="object-cover" />
              </div>
            );
          }
        })}

        {/* Render Tab: Videos */}
        {activeTab === "videos" && youtubeVideos.map((video) => (
          <a key={video.id} href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noreferrer" className="relative w-[300px] md:w-[500px] shrink-0 aspect-video snap-start group overflow-hidden rounded-lg bg-black">
            <Image src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt={video.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-black/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white text-white" />
              </div>
            </div>
          </a>
        ))}

        {/* Render Tab: Backdrops */}
        {activeTab === "backdrops" && backdrops.map((backdrop, idx) => (
          <div key={idx} className="relative w-[300px] md:w-[500px] shrink-0 aspect-video snap-start overflow-hidden rounded-lg bg-muted">
            <Image src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2${backdrop.file_path}`} alt="Backdrop" fill className="object-cover" />
          </div>
        ))}

        {/* Render Tab: Posters (Tỷ lệ 2:3 khác với video/backdrop) */}
        {activeTab === "posters" && posters.map((poster, idx) => (
          <div key={idx} className="relative w-[150px] md:w-[200px] shrink-0 aspect-[2/3] snap-start overflow-hidden rounded-lg bg-muted border border-border">
            <Image src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster.file_path}`} alt="Poster" fill className="object-cover" />
          </div>
        ))}
        
        {/* Thông báo nếu tab rỗng */}
        {((activeTab === "videos" && youtubeVideos.length === 0) || 
          (activeTab === "backdrops" && backdrops.length === 0) || 
          (activeTab === "posters" && posters.length === 0)) && (
          <div className="w-full py-8 text-center text-muted-foreground">
            No media found for this category.
          </div>
        )}

      </div>
    </div>
  );
}