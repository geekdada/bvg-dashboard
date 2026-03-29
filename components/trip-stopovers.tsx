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
            {/* Timeline line */}
            {!isLast && (
              <div
                className={`absolute left-[11px] top-8 bottom-[-8px] w-[2px] ${isPast ? 'bg-muted' : 'bg-primary/30'}`}
              />
            )}

            <div className="flex items-start gap-4 py-3">
              {/* Timeline dot */}
              <div className="relative z-10 mt-1.5 flex h-6 w-6 items-center justify-center">
                <div
                  className={`rounded-full shadow-sm ring-4 ring-card transition-all ${isCurrent ? 'bg-primary ring-primary/20 h-3 w-3' : isPast ? 'bg-muted h-2.5 w-2.5' : 'bg-primary h-2.5 w-2.5'}`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <h3
                      className={`font-medium truncate text-foreground transition-colors ${isPast ? 'text-muted-foreground' : ''}`}
                    >
                      {stopover.stop.name}
                    </h3>

                    {/* Platform info */}
                    {(stopover.arrivalPlatform ||
                      stopover.departurePlatform) && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Platform{' '}
                        {stopover.departurePlatform || stopover.arrivalPlatform}
                      </div>
                    )}

                    {/* Occupancy */}
                    {stopover.occupancy && (
                      <div className="flex items-center mt-2">
                        <Badge
                          variant="outline"
                          className={`text-xs flex items-center gap-1.5 border-border bg-transparent ${
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
                          className={
                            isPast ? 'text-muted-foreground' : 'text-foreground'
                          }
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

                {/* Current indicator */}
                {isCurrent && (
                  <div className="mt-2 text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded font-semibold inline-block">
                    Currently here
                  </div>
                )}

                {/* Remarks */}
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
