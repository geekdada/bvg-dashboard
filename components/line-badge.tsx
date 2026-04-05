import { getProductColor } from "@/lib/utils"
import type { Line } from "@/lib/types"

interface LineBadgeProps {
  line: Line
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "min-w-[2.75rem] h-9 text-xs px-2.5 rounded-[0.95rem]",
  md: "min-w-[3.25rem] h-11 text-sm px-3 rounded-[1.1rem]",
  lg: "min-w-[3.75rem] h-14 text-lg px-3.5 rounded-[1.2rem]"
}

export default function LineBadge({ line, size = "md", className = "" }: LineBadgeProps) {
  return (
    <div
      className={`flex items-center justify-center text-white font-semibold tracking-[-0.04em] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] ${getProductColor(line.product)} ${sizeClasses[size]} ${className}`}
    >
      <span className="text-center truncate">{line.name}</span>
    </div>
  )
}