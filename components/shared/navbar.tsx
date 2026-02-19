"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { Film, User, LogOut } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-2xl tracking-tight text-primary flex items-center gap-2">
          <Film className="w-6 h-6" />
          <span>Cine<span className="text-foreground">Atlas</span></span>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground mr-4">
            <Link href="/discover" className="hover:text-foreground transition-colors">Discover</Link>
            {session && (
              <Link href="/watchlist" className="hover:text-foreground transition-colors">Watchlist</Link>
            )}
          </nav>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="h-6 w-[1px] bg-border hidden sm:block"></div>

            {/* Auth State Handling */}
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                      <AvatarFallback>{session.user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/watchlist" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Watchlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}