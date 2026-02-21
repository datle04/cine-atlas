import Link from "next/link";
import { Film, Github, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & TMDB Attribution ) */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">CineAtlas</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Khám phá thế giới điện ảnh bất tận. Nơi lưu giữ những bộ phim, chương trình truyền hình và các diễn viên yêu thích của bạn.
            </p>
            
            {/* TMDB Attribution */}
            <div className="flex items-center gap-3 pt-4">
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                alt="TMDB Logo" 
                className="h-4"
              />
              <p className="text-[10px] md:text-xs text-muted-foreground max-w-[200px]">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </div>
          </div>

          {/* Discover*/}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/movie" className="hover:text-primary transition-colors">Movies</Link>
              </li>
              <li>
                <Link href="/tv" className="hover:text-primary transition-colors">TV Shows</Link>
              </li>
              <li>
                <Link href="/person" className="hover:text-primary transition-colors">People</Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên kết hệ thống */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Phần Bottom: Copyright & Social Links */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CineAtlas. Built by Lê Tấn Đạt.</p>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-4 w-4" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <span className="sr-only">Portfolio</span>
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}