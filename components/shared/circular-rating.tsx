import { cn } from "@/lib/utils";

interface CircularRatingProps {
  rating: number; 
  className?: string;
}

export function CircularRating({ rating, className }: CircularRatingProps) {
  const percent:string | number = Math.round(rating * 10);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  let colorClass = "stroke-green-500";
  let trackClass = "stroke-green-900/50";
  
  if (percent === 0) {
    colorClass = "stroke-muted-foreground";
    trackClass = "stroke-muted";
  } else if (percent < 40) {
    colorClass = "stroke-red-500";
    trackClass = "stroke-red-900/50";
  } else if (percent < 70) {
    colorClass = "stroke-yellow-500";
    trackClass = "stroke-yellow-900/50";
  }

  return (
    <div className={cn("relative flex items-center justify-center rounded-full bg-background/95 w-[40px] h-[40px] shadow-md border border-border/50", className)}>
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 40 40">
        {/* Background Track */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="transparent"
          strokeWidth="3"
          className={trackClass}
        />
        {/* Progress Circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="transparent"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={colorClass}
        />
      </svg>
      <div className="absolute flex items-start justify-center font-bold text-foreground">
        {percent === 0 ? (
          <span className="text-[10px]">NR</span>
        ) : (
          <>
            <span className="text-[12px]">{percent}</span>
            <span className="text-[6px] mt-[2px]">%</span>
          </>
        )}
      </div>
    </div>
  );
}