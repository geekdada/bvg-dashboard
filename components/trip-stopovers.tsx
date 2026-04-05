import React from 'react'
import { Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import TimeDisplay from '@/components/time-display'
import DelayDisplay from '@/components/delay-display'
import RemarksDisplay from '@/components/remarks-display'

export default function TripStopovers({ stopovers }: { stopovers: any[] }) {
  const now = new Date()

  return (
    <div className="space-y-0 relative">
      {stopovers.map((stopover, index) => {
        const isFirst = index === 0
        const isLast = index === stopovers.length - 1

        // Determine if this stop is in the past or current
        const departureTime = stopover.departure
          ? new Date(stopover.departure)
          : null
        const arrivalTime = stopover.arrival ? new Date(stopover.arrival) : null
        const isPast =
          (departureTime && departureTime < now) ||
          (arrivalTime && arrivalTime < now && !departureTime)
        const isCurrent =
          !isPast &&
          arrivalTime &&
          arrivalTime <= now &&
          departureTime &&
          departureTime >= now

        return (
          <div key={`${stopover.stop.id}-${index}`} className="relative">
            {!isLast && (
              <div
                className={`absolute left-[14px] top-10 bottom-[-8px] w-[2px] ${isPast ? 'bg-muted/70' : 'bg-primary/40'}`}
              />
            )}

            <div className="flex items-start gap-4 py-4">
              <div className="relative z-10 mt-1.5 flex h-7 w-7 items-center justify-center">
                <div
                  className={`rounded-full shadow-sm ring-4 ring-card transition-all ${isCurrent ? 'h-3.5 w-3.5 bg-primary ring-primary/20' : isPast ? 'h-2.5 w-2.5 bg-muted' : 'h-3 w-3 bg-primary/90'}`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <h3
                      className={`truncate text-base font-medium tracking-[-0.02em] text-foreground transition-colors ${isPast ? 'text-muted-foreground' : ''}`}
                    >
                      {stopover.stop.name}
                    </h3>

                    {(stopover.arrivalPlatform ||
                      stopover.departurePlatform) && (
                      <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Platform{' '}
                        {stopover.departurePlatform || stopover.arrivalPlatform}
                      </div>
                    )}

                    {stopover.occupancy && (
                      <div className="flex items-center mt-2">
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1.5 rounded-full border-border/70 bg-muted/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] ${
                            stopover.occupancy === 'high'
                              ? 'text-destructive'
                              : stopover.occupancy === 'medium'
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-green-600 dark:text-green-400'
                          }`}
                        >
                          <Users className="h-3 w-3" />
                          <span className="capitalize">
                            {stopover.occupancy}
                          </span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    {(stopover.departure || (isLast && stopover.arrival)) && (
                      <div className="flex flex-col items-end">
                        <TimeDisplay
                          time={stopover.departure || stopover.arrival}
                          className={isPast ? 'opacity-75' : ''}
                        />
                        <DelayDisplay
                          delay={
                            stopover.departureDelay || stopover.arrivalDelay
                          }
                          className="mt-1"
                          size="sm"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {isCurrent && (
                  <div className="signal-text mt-3 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
                    Currently here
                  </div>
                )}

                {stopover.remarks && stopover.remarks.length > 0 && (
                  <RemarksDisplay remarks={stopover.remarks} className="mt-3" />
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
