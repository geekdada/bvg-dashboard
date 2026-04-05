import type React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[linear-gradient(135deg,hsl(var(--muted))_0%,hsl(var(--accent))_100%)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
