"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getProductColor } from "@/lib/utils"
import Link from "next/link"
import type { DepartureItemProps } from "@/lib/types"
import TimeDisplay from "@/components/time-display"
import DelayDisplay from "@/components/delay-display"
import PlatformBadge from "@/components/platform-badge"
import RemarksDisplay from "@/components/remarks-display"

export default function DepartureItem({ departure }: DepartureItemProps) {
  const { when, plannedWhen, delay = 0, platform, direction, line, remarks, tripId } = departure

  const productColor = getProductColor(line.product)

  // Use direction or destination name or fallback
  const destinationText = direction || departure.destination?.name || "Unknown destination"

  return (
    <Link href={`/trips/${tripId}`} className="block hover:opacity-95 transition-opacity">
      <Card className="border-none shadow-md bvg-card overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-stretch">
            <div
              className={`flex items-center justify-center w-14 sm:w-16 text-white font-bold text-sm sm:text-base text-center ${productColor}`}
            >
              {line.name}
            </div>

            <div className="flex-1 min-w-0 p-3 sm:p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm sm:text-base line-clamp-1">{destinationText}</h3>
                  </div>
                  <PlatformBadge platform={platform || undefined} className="mt-1" />
                </div>

                <div className="text-right flex-shrink-0 ml-1">
                  <TimeDisplay 
                    time={when || plannedWhen || ''} 
                    variant="badge" 
                  />
                  <DelayDisplay 
                    delay={delay || undefined} 
                    className="mt-1 text-center justify-center line-clamp-1" 
                    size="md" 
                  />
                </div>
              </div>

              <RemarksDisplay remarks={remarks} className="mt-1 sm:mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
