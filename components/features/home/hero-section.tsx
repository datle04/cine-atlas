"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { Movie } from "@/types/tmdb";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightRays from "@/components/LightRays"; 

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only run useTheme after component mounted (avoid hydration)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const isLightMode = mounted && resolvedTheme === "light";
  const raysColorHex = isLightMode ? "#00AEEF" : "#ffff"; 

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col justify-center overflow-hidden bg-background transition-colors duration-300">
      
      {/* Backdrop */}
      <div className="absolute inset-0 z-0">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className={`object-cover ${isLightMode ? "opacity-80" : "opacity-80"}`}
            priority 
          />
        )}
      </div>

      {/* Light Rays */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
         {mounted && (
            <LightRays
              raysColor={raysColorHex} 
              raysSpeed={0.5}          
              lightSpread={1.0}        
              rayLength={2}      
              noiseAmount={0}   
              pulsating={false}        
              followMouse={false}      
            />
         )}
      </div>

    {/* 3. Gradient Overlay */}
    <div 
    className="
        absolute inset-0 z-0 pointer-events-none 
        bg-gradient-to-t 
        from-sky-50/90 via-sky-50/40 via-30%  /* Light Mode: Đậm ở đáy, nhạt nhanh ở giữa */
        dark:from-background dark:via-background/80 /* Dark Mode: Đen ở đáy như cũ */
        to-transparent
    " 
    />

    {/* Side Gradient Overlay (Left -> Right) */}
    <div 
    className="
        absolute inset-0 z-0 pointer-events-none 
        bg-gradient-to-r 
        from-sky-50/80 via-sky-50/30 via-40%        /* Light Mode: Đậm ở trái, nhạt nhanh ở phải */
        dark:from-background dark:via-background/60 dark:md:via-background/30 /* Dark Mode: Đen bên trái */
        to-transparent
    " 
    />
      {/* Hero Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 pointer-events-none mt-16">
        <div className="max-w-3xl space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-md">
              {movie.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex items-center gap-4 text-sm font-medium text-muted-foreground"
          >
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
              ★ {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span>{movie.release_date?.substring(0, 4)}</span>
            <span className="px-2 py-0.5 border border-border rounded text-xs text-foreground font-semibold">HD</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-foreground/80 line-clamp-3 md:line-clamp-4 drop-shadow-sm pointer-events-auto"
          >
            {movie.overview}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 pt-4 pointer-events-auto"
          >
            <Button size="lg" className="rounded-full px-8 gap-2 font-semibold">
              <Play className="w-5 h-5 fill-current" />
              Watch Trailer
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full px-8 gap-2 bg-secondary/80 hover:bg-secondary backdrop-blur-md" asChild>
              <Link href={`/movie/${movie.id}`}>
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </Button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}