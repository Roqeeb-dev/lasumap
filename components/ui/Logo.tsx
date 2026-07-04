import { MapPin } from "lucide-react";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  showText?: boolean;
  className?: string;
}

const sizeConfig: Record<
  LogoSize,
  { mark: string; icon: string; text: string; gap: string }
> = {
  sm: { mark: "h-7 w-7", icon: "h-3.5 w-3.5", text: "text-sm", gap: "gap-1.5" },
  md: { mark: "h-8 w-8", icon: "h-4 w-4", text: "text-[15px]", gap: "gap-2" },
  lg: { mark: "h-10 w-10", icon: "h-5 w-5", text: "text-lg", gap: "gap-2.5" },
};

export default function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const { mark, icon, text, gap } = sizeConfig[size];

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <div
        className={`flex flex-shrink-0 items-center justify-center rounded-full bg-primary ${mark}`}
      >
        <MapPin
          className={`${icon} text-primary-foreground`}
          strokeWidth={2.5}
        />
      </div>

      {showText && (
        <p
          className={`whitespace-nowrap font-medium leading-none text-foreground ${text}`}
        >
          <span className="text-primary">LASU</span> Navigate
        </p>
      )}
    </div>
  );
}
