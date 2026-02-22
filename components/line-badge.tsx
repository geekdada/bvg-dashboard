import { getProductColor } from "@/lib/utils"
import type { Line } from "@/lib/types"

interface LineBadgeProps {
  line: Line
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "min-w-[2.5rem] h-8 text-xs px-2",
  md: "min-w-[3rem] h-10 text-sm px-2.5", 
  lg: "min-w-[3.5rem] h-12 text-base px-3"
}

export default function LineBadge({ line, size = "md", className = "" }: LineBadgeProps) {
  return (
    <div
      className={`flex items-center justify-center text-white font-semibold rounded-lg shadow-sm ${getProductColor(line.product)} ${sizeClasses[size]} ${className}`}
    >
      <span className="text-center truncate">{line.name}</span>
    </div>
  )
}