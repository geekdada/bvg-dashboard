import { Badge } from "@/components/ui/badge"

interface PlatformBadgeProps {
  platform?: string
  variant?: "default" | "bvg"
  className?: string
}

export default function PlatformBadge({ platform, variant = "bvg", className = "" }: PlatformBadgeProps) {
  if (!platform) return null

  const variantClasses = {
    default: "bg-gray-100 text-gray-800 border-gray-300",
    bvg: "bg-black text-bvg-yellow border-none"
  }

  return (
    <Badge variant="outline" className={`${variantClasses[variant]} ${className}`}>
      Platform {platform}
    </Badge>
  )
}