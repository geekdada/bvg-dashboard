import React from "react"
import { formatTime, getDelayClass, formatDelay } from "@/lib/utils"
import { Rabbit, Turtle, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StopoverProps {
  stopover: {
    stop: {
      id: string
      name: string
    }
    arrival?: string
    plannedArrival?: string
    arrivalDelay?: number
    arrivalPlatform?: string
    departure?: string
    plannedDeparture?: string
    departureDelay?: number
    departurePlatform?: string
    remarks?: Array<any>
    occupancy?: "low" | "medium" | "high"
  }
  isFirst: boolean
  isLast: boolean
  isPast: boolean
  isCurrent: boolean
}

export default function TripStopovers({ stopovers }: { stopovers: any[] }) {
  const now = new Date()

  return (
    <div className="space-y-1 relative">
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
            <div
              className={`absolute left-3 top-0 h-full w-0.5 ${isPast ? "bg-gray-300" : "bg-black dark:bg-bvg-yellow"}`}
            ></div>

            <div className="flex items-start gap-4 py-2">
              {/* Timeline dot */}
              <div
                className={`relative z-10 mt-1 w-6 h-6 rounded-full flex items-center justify-center 
                ${isCurrent ? "bg-bvg-yellow text-black" : isPast ? "bg-gray-300 text-gray-600" : "bg-black text-bvg-yellow dark:bg-bvg-yellow dark:text-black"}`}
              >
                {isFirst ? "S" : isLast ? "E" : "•"}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${isPast ? "text-gray-500" : ""}`}>{stopover.stop.name}</h3>

                    {/* Platform info */}
                    {(stopover.arrivalPlatform || stopover.departurePlatform) && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Platform: {stopover.departurePlatform || stopover.arrivalPlatform}
                      </div>
                    )}

                    {/* Occupancy */}
                    {stopover.occupancy && (
                      <div className="flex items-center mt-1">
                        <Badge
                          variant="outline"
                          className={`border-none text-xs flex items-center gap-1 ${
                            stopover.occupancy === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : stopover.occupancy === "medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          <Users className="h-3 w-3" />
                          <span className="capitalize">{stopover.occupancy}</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    {/* Show departure time if available, otherwise show arrival time for the last stop */}
                    {(stopover.departure || (isLast && stopover.arrival)) && (
                      <div className="flex flex-col items-end">
                        <span className={`text-sm font-mono ${isPast ? "text-gray-500" : ""}`}>
                          {formatTime(stopover.departure || stopover.arrival)}
                        </span>

                        {/* Show delay if available */}
                        {((stopover.departureDelay !== 0 && stopover.departureDelay !== undefined) ||
                          (isLast && stopover.arrivalDelay !== 0 && stopover.arrivalDelay !== undefined)) && (
                          <span
                            className={`text-xs font-mono flex items-center mt-1 ${getDelayClass(
                              stopover.departureDelay || stopover.arrivalDelay,
                            )}`}
                          >
                            {formatDelay(stopover.departureDelay || stopover.arrivalDelay) && (
                              <>
                                {(stopover.departureDelay || stopover.arrivalDelay) > 0 ? (
                                  <Turtle className="h-3 w-3 mr-1" />
                                ) : (
                                  <Rabbit className="h-3 w-3 mr-1" />
                                )}
                              </>
                            )}
                            {formatDelay(stopover.departureDelay || stopover.arrivalDelay)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Current indicator */}
                {isCurrent && (
                  <div className="mt-1 text-xs bg-bvg-yellow text-black px-2 py-0.5 rounded inline-block">
                    Currently at this stop
                  </div>
                )}

                {/* Remarks */}
                {stopover.remarks && stopover.remarks.length > 0 && (
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stopover.remarks.map((remark, i) => (
                      <React.Fragment key={i}>
                        {i !== 0 && <span> | </span>}
                        <span
                          className="[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:dark:hover:text-blue-300"
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
