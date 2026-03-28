'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getProductColor } from '@/lib/utils'
import Link from 'next/link'
import type { DepartureItemProps } from '@/lib/types'
import TimeDisplay from '@/components/time-display'
import DelayDisplay from '@/components/delay-display'
import PlatformBadge from '@/components/platform-badge'
import RemarksDisplay from '@/components/remarks-display'

export default function DepartureItem({ departure }: DepartureItemProps) {
  const {
    when,
    plannedWhen,
    delay = 0,
    platform,
    direction,
    line,
    remarks,
    tripId,
  } = departure

  const productColor = getProductColor(line.product)

  // Use direction or destination name or fallback
  const destinationText =
    direction || departure.destination?.name || 'Unknown destination'

  return (
    <Link href={`/trips/${tripId}`} className="block group">
      <Card className="bvg-card p-4 sm:p-5 hover:bg-muted/10 transition-colors duration-200 border-border/50 hover:border-border/60">
        <div className="flex items-start gap-4">
          {/* Line Badge */}
          <div className="flex-shrink-0">
            <div
              className={`flex items-center justify-center min-w-12 sm:min-w-14 px-2 py-1.5 rounded-md text-white font-semibold text-sm text-center shadow-sm whitespace-nowrap ${productColor}`}
            >
              {line.name}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-1 text-foreground transition-colors">
                  {destinationText}
                </h3>
                <PlatformBadge
                  platform={platform || undefined}
                  className="mt-1.5"
                />
              </div>

              <div className="text-right flex-shrink-0 flex flex-col items-end">
                <TimeDisplay
                  time={when || plannedWhen || ''}
                  variant="badge"
                />
                <DelayDisplay
                  delay={delay || undefined}
                  className="mt-2"
                  size="md"
                />
              </div>
            </div>

            <RemarksDisplay remarks={remarks} className="mt-3" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
