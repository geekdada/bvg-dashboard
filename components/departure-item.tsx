'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getProductColor, getProductName, getRelativeTime } from '@/lib/utils'
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
  const departureTime = when || plannedWhen || ''
  const relativeTime = getRelativeTime(departureTime)

  return (
    <Link href={`/trips/${tripId}`} className="block group">
      <Card className="bvg-card overflow-hidden border-border/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/20">
        <CardContent className="p-4 sm:p-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 sm:hidden">
              <div
                className={`flex min-w-14 items-center justify-center rounded-[1rem] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm whitespace-nowrap ${productColor}`}
              >
                {line.name}
              </div>
              <div className="flex min-w-0 flex-col items-end gap-2 text-right">
                <TimeDisplay time={departureTime} variant="badge" />
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
                    {relativeTime}
                  </div>
                  <DelayDisplay delay={delay || undefined} size="sm" />
                </div>
              </div>
            </div>

            <div className="hidden items-start gap-4 sm:flex">
              <div className="flex shrink-0 flex-col items-center gap-3">
                <div
                  className={`flex min-w-14 items-center justify-center rounded-[1rem] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm whitespace-nowrap ${productColor}`}
                >
                  {line.name}
                </div>
                <div className="h-full min-h-10 w-px bg-border/60" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="section-kicker">Towards</div>
                    <h3 className="mt-2 line-clamp-2 text-lg font-semibold tracking-[-0.03em] text-foreground transition-colors sm:text-xl">
                      {destinationText}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <PlatformBadge platform={platform || undefined} />
                      <span className="station-chip">
                        {getProductName(line.product)}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 text-left sm:items-end sm:text-right">
                    <TimeDisplay time={departureTime} variant="badge" />
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
                      {relativeTime}
                    </div>
                    <DelayDisplay delay={delay || undefined} size="md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="section-kicker sm:hidden">Towards</div>
              <h3 className="mt-2 line-clamp-2 text-[1.65rem] font-semibold tracking-[-0.04em] text-foreground transition-colors sm:hidden">
                {destinationText}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
                <PlatformBadge platform={platform || undefined} />
                <span className="station-chip">
                  {getProductName(line.product)}
                </span>
              </div>
            </div>

            <RemarksDisplay remarks={remarks} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
