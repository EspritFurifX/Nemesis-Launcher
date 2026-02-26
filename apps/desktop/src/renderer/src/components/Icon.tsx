import "@fortawesome/fontawesome-free/css/all.min.css";

interface IconProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClass = sizeMap[size];
  return (
    <i className={`fas ${name} ${sizeClass} ${className}`}></i>
  );
}

// Predefined icons for common use
export const Icons = {
  home: "fa-home",
  server: "fa-globe",
  settings: "fa-cog",
  logout: "fa-door-open",
  play: "fa-play-circle",
  update: "fa-sync-alt",
  download: "fa-download",
  install: "fa-hammer",
  error: "fa-exclamation-circle",
  check: "fa-check-circle",
  gamepad: "fa-gamepad",
  shield: "fa-shield-alt",
  shopping: "fa-shopping-bag",
  arrow: "fa-arrow-left",
  chevronDown: "fa-chevron-down",
  chevronRight: "fa-chevron-right",
  info: "fa-info-circle",
  users: "fa-users",
  version: "fa-cogs",
  build: "fa-hammer",
  palette: "fa-palette",
  cloud: "fa-cloud",
  sword: "fa-sword",
};
