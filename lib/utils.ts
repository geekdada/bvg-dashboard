import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ClassValue } from "clsx"

export function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDelay(seconds: number): string {
  if (seconds === 0) return ""

  const minutes = Math.floor(Math.abs(seconds) / 60)
  const sign = seconds > 0 ? "+" : "-"

  if (seconds === 0) return ""

  return `${sign}${minutes} min`
}

export function getDelayClass(delay: number | null): string {
  if (!delay) return ""
  if (delay <= 0) return "text-green-600"
  if (delay <= 180) return "text-yellow-600" // 3 minutes
  return "text-red-600"
}

export function getProductIcon(product: string): string {
  switch (product) {
    case "suburban":
      return "S"
    case "subway":
      return "U"
    case "tram":
      return "T"
    case "bus":
      return "B"
    case "ferry":
      return "F"
    case "express":
      return "E"
    case "regional":
      return "R"
    default:
      return "?"
  }
}

export function getProductColor(product: string): string {
  switch (product) {
    case "suburban":
      return "bg-transport-suburban"
    case "subway":
      return "bg-transport-subway"
    case "tram":
      return "bg-transport-tram"
    case "bus":
      return "bg-transport-bus"
    case "ferry":
      return "bg-transport-ferry"
    case "express":
      return "bg-transport-express"
    case "regional":
      return "bg-transport-regional"
    default:
      return "bg-gray-600"
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
