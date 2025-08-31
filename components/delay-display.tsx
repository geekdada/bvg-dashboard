import { formatDelay, getDelayClass } from "@/lib/utils"
import { Clock, Rabbit, Turtle } from "lucide-react"

interface DelayDisplayProps {
  delay?: number
  className?: string
  size?: "sm" | "md"
}

export default function DelayDisplay({ delay = 0, className = "", size = "md" }: DelayDisplayProps) {
  if (!delay) return null

  const delayClass = getDelayClass(delay)
  const DelayIcon = delay === 0 ? Clock : delay > 0 ? Turtle : Rabbit
  
  const iconClasses = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5"
  }

  const textClasses = {
    sm: "text-xs",
    md: "text-xs sm:text-sm"
  }

  return (
    <div className={`font-mono flex items-center gap-1 whitespace-nowrap ${delayClass} ${className}`}>
      <DelayIcon className={iconClasses[size]} />
      <span className={textClasses[size]}>{formatDelay(delay)}</span>
    </div>
  )
}