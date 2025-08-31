import { getProductColor } from "@/lib/utils"
import type { Line } from "@/lib/types"

interface LineBadgeProps {
  line: Line
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-lg", 
  lg: "w-14 h-14 text-xl"
}

export default function LineBadge({ line, size = "md", className = "" }: LineBadgeProps) {
  return (
    <div
      className={`flex items-center justify-center text-white font-bold rounded-full overflow-hidden ${getProductColor(line.product)} ${sizeClasses[size]} ${className}`}
      style={{ minWidth: size === "lg" ? "3.5rem" : size === "md" ? "3rem" : "2.5rem", minHeight: size === "lg" ? "3.5rem" : size === "md" ? "3rem" : "2.5rem" }}
    >
      <span className="text-center px-1">{line.name}</span>
    </div>
  )
}