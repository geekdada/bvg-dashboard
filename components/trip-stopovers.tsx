import React from "react"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import TimeDisplay from "@/components/time-display"
import DelayDisplay from "@/components/delay-display"


export default function TripStopovers({ stopovers }: { stopovers: any[] }) {
  const now = new Date()

  return (
    <div className="space-y-0 relative">
      {stopovers.map((stopover, index) => {
        const isFirst = index === 0
        const isLast = index === stopovers.length - 1

        // Determine if this stop is in the past or current
        const departureTime = stopover.departure ? new Date(stopover.departure) : null
        const arrivalTime = stopover.arrival ? new Date(stopover.arrival) : null
        const isPast = (departureTime && departureTime < now) || (arrivalTime && arrivalTime < now && !departureTime)
        const isCurrent = !isPast && arrivalTime && arrivalTime <= now && departureTime && departureTime >= now

        return (
          <div key={`${stopover.stop.id}-${index}`} className="relative">
            {/* Timeline line */}
            {!isLast && (
              <div
                className={`absolute left-3 top-6 h-full w-0.5 ${isPast ? "bg-gray-300 dark:bg-gray-700" : "bg-black dark:bg-bvg-yellow"}`}
              />
            )}

            <div className="flex items-start gap-4 py-3">
              {/* Timeline dot */}
              <div
                className={`relative z-10 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${isCurrent ? "bg-bvg-yellow text-black" : isPast ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400" : "bg-black text-bvg-yellow dark:bg-bvg-yellow dark:text-black"}`}
              >
                {isFirst ? "S" : isLast ? "E" : "•"}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className={`font-medium truncate bvg-text ${isPast ? "bvg-text-muted" : ""}`}>{stopover.stop.name}</h3>

                    {/* Platform info */}
                    {(stopover.arrivalPlatform || stopover.departurePlatform) && (
                      <div className="text-sm bvg-text-muted">
                        Platform {stopover.departurePlatform || stopover.arrivalPlatform}
                      </div>
                    )}

                    {/* Occupancy */}
                    {stopover.occupancy && (
                      <div className="flex items-center mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs flex items-center gap-1 ${
                            stopover.occupancy === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700"
                              : stopover.occupancy === "medium"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
                                : "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700"
                          }`}
                        >
                          <Users className="h-3 w-3" />
                          <span className="capitalize">{stopover.occupancy}</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    {(stopover.departure || (isLast && stopover.arrival)) && (
                      <div className="flex flex-col items-end">
                        <TimeDisplay
                          time={stopover.departure || stopover.arrival}
                          className={isPast ? "bvg-text-muted" : ""}
                        />
                        <DelayDisplay
                          delay={stopover.departureDelay || stopover.arrivalDelay}
                          className="mt-0.5"
                          size="sm"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Current indicator */}
                {isCurrent && (
                  <div className="mt-2 text-xs bg-bvg-yellow text-black px-2 py-1 rounded font-medium inline-block">
                    Currently here
                  </div>
                )}

                {/* Remarks */}
                {stopover.remarks && stopover.remarks.length > 0 && (
                  <div className="mt-2 text-sm bvg-text-muted">
                    {stopover.remarks.map((remark: any, i: number) => (
                      <React.Fragment key={i}>
                        {i !== 0 && <span> | </span>}
                        <span
                          className="[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline"
                          dangerouslySetInnerHTML={{ __html: remark.text || remark.summary || "" }}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
