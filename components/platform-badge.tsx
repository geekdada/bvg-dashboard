import { Badge } from "@/components/ui/badge"

interface PlatformBadgeProps {
  platform?: string
  variant?: "default" | "bvg"
  className?: string
}

export default function PlatformBadge({ platform, variant = "bvg", className = "" }: PlatformBadgeProps) {
  if (!platform) return null

  const variantClasses = {
    default: "bg-muted text-muted-foreground border-transparent",
    bvg: "bg-secondary/60 text-secondary-foreground border-border/70"
  }

  return (
    <Badge variant="outline" className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] ${variantClasses[variant]} ${className}`}>
      <span className="sm:hidden">Pl. {platform}</span>
      <span className="hidden sm:inline">Platform {platform}</span>
    </Badge>
  )
}