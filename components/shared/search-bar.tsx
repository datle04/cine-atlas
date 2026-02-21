"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearch } from "@/hooks/queries/use-search";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false); 
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 500);
  const { data: results, isLoading } = useSearch(debouncedQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMode && inputRef.current) {
      // Delay for animation
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isMobileMode]);

  const handleClear = () => {
    setQuery("");
    if (!isMobileMode) setIsOpen(false);
    inputRef.current?.focus();
  };

  const closeMobileSearch = () => {
    setIsMobileMode(false);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="flex items-center justify-end">
      
      {/* Magnifier (mobile) */}
      {!isMobileMode && (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setIsMobileMode(true)}
        >
          <Search className="h-5 w-5 text-foreground" />
        </Button>
      )}

      <AnimatePresence mode="wait">
        {(isMobileMode || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
          <motion.div
            key="search-container"
            // Only animate on mobile
            initial={isMobileMode ? { opacity: 0, y: -20 } : false}
            animate={isMobileMode ? { opacity: 1, y: 0 } : false}
            exit={isMobileMode ? { opacity: 0, y: -20 } : undefined}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            
            className={`
              ${isMobileMode 
                ? "absolute inset-x-0 top-0 z-50 flex h-16 items-center px-4 bg-background/95 backdrop-blur-md border-b" 
                : "hidden md:flex relative w-full max-w-sm"
              }
            `}
          >
            
            {/* Back button (mobile) */}
            {isMobileMode && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                 <Button variant="ghost" size="icon" className="mr-2 shrink-0 rounded-full" onClick={closeMobileSearch}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {/* Input container*/}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hidden md:block" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search movies, tv, people..."
                className="pl-4 md:pl-9 pr-10 w-full rounded-full bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:bg-background transition-all"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full hover:bg-transparent"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>

            {/* Dropdown réult */}
            <AnimatePresence>
              {isOpen && query.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0 }} 
                  className={`
                    absolute top-full mt-2 w-full rounded-xl border bg-background shadow-lg overflow-hidden origin-top
                    ${isMobileMode ? "left-0 px-4 mt-0 border-x-0 rounded-none border-t-0 h-[calc(100vh-4rem)] shadow-none" : "z-50"}
                  `}
                >

                   {isLoading ? (
                      <div className="flex items-center justify-center p-6">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : results && results.length > 0 ? (
                      <div className="max-h-[70vh] md:max-h-[400px] overflow-y-auto py-2 hide-scrollbar">
                        {results.slice(0, 5).map((item: any) => {
                             const isPerson = item.media_type === "person";
                             const title = item.title || item.name;
                             const imagePath = isPerson ? item.profile_path : item.poster_path;
                             const imageUrl = imagePath ? `https://image.tmdb.org/t/p/w92${imagePath}` : "https://via.placeholder.com/92x138?text=No+Image";
           
                             return (
                               <Link key={item.id} href={`/${item.media_type}/${item.id}`} onClick={closeMobileSearch} className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors">
                                 <div className={`relative shrink-0 overflow-hidden bg-muted ${isPerson ? "h-10 w-10 rounded-full" : "h-14 w-10 rounded"}`}>
                                   <Image src={imageUrl} alt={title} fill className="object-cover" />
                                 </div>
                                 <div className="flex flex-col overflow-hidden">
                                   <span className="text-sm font-medium truncate">{title}</span>
                                   <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                     <span className="capitalize px-1.5 py-0.5 rounded-sm bg-secondary">{item.media_type}</span>
                                     {isPerson ? <span>{item.known_for_department}</span> : <span>{(item.release_date || item.first_air_date)?.substring(0, 4)}</span>}
                                   </div>
                                 </div>
                               </Link>
                             );
                        })}
                        <Link href={`/search?q=${encodeURIComponent(query)}`} onClick={closeMobileSearch} className="block text-center text-sm text-primary p-3 hover:bg-muted font-medium transition-colors border-t mt-1">View all results</Link>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-sm text-muted-foreground">No results found for "{query}"</div>
                    )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}