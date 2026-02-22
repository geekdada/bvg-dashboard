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
    bvg: "bg-secondary text-secondary-foreground border-border"
  }

  return (
    <Badge variant="outline" className={`text-xs font-medium ${variantClasses[variant]} ${className}`}>
      Platform {platform}
    </Badge>
  )
}