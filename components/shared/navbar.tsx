import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full glassmorphism">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tight text-primary flex items-center gap-2">
          <span>TMDB<span className="text-foreground">Clone</span></span>
        </Link>
        
        {/* Nhóm điều hướng bên phải */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/discover" className="hover:text-foreground transition-colors">Khám phá</Link>
            <Link href="/watchlist" className="hover:text-foreground transition-colors">Yêu thích</Link>
          </nav>
          
          <div className="flex items-center gap-2">
            {/* Vị trí dành cho nút Đăng nhập / User Avatar sau này */}
            <div className="h-8 w-[1px] bg-border mx-2"></div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}