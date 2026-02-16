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
    <Link href={`/trips/${tripId}`} className="block">
      <Card className="bvg-card overflow-hidden hover:border-bvg-yellow transition-colors">
        <CardContent className="p-0">
          <div className="flex items-stretch">
            {/* Line Badge */}
            <div
              className={`flex items-center justify-center w-16 sm:w-20 text-white font-bold text-sm sm:text-lg text-center rounded-l-2xl ${productColor}`}
            >
              {line.name}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 p-4 sm:p-5">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-1 bvg-text">{destinationText}</h3>
                  <PlatformBadge platform={platform || undefined} className="mt-1" />
                </div>

                <div className="text-right flex-shrink-0">
                  <TimeDisplay
                    time={when || plannedWhen || ''}
                    variant="badge"
                  />
                  <DelayDisplay
                    delay={delay || undefined}
                    className="mt-1 text-center justify-center"
                    size="md"
                  />
                </div>
              </div>

              <RemarksDisplay remarks={remarks} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
