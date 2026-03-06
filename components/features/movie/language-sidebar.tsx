"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho Prop truyền vào
interface LanguageSidebarProps {
  availableLanguages: {
    code: string;
    name: string;
  }[];
}

export function LanguageSidebar({ availableLanguages }: LanguageSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentLang = searchParams.get("language") || "en";

  const handleLanguageChange = (code: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("language", code);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full md:w-[250px] shrink-0 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border/50 p-4 sticky top-24">
        <h3 className="font-bold text-lg mb-4 text-foreground pb-2 border-b border-border/50">
          Languages
        </h3>
        
        <ul className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {availableLanguages.map((lang, index) => {
            const isActive = currentLang === lang.code;
            return (
              <li key={index}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary font-bold" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                  }`}
                >
                  <span className="truncate pr-2">{lang.name}</span>
                  {isActive && <Check className="w-4 h-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}