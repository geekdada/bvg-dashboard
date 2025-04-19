"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatTime, formatDelay, getDelayClass, getProductColor } from "@/lib/utils"

interface DepartureItemProps {
  departure: {
    tripId: string
    when: string
    plannedWhen?: string
    delay?: number
    platform?: string
    direction?: string
    line: {
      name: string
      product: string
    }
    remarks?: Array<{
      text: string
    }>
    destination?: {
      name: string
    }
  }
}

export default function DepartureItem({ departure }: DepartureItemProps) {
  const { when, plannedWhen, delay = 0, platform, direction, line, remarks } = departure

  const delayClass = getDelayClass(delay)
  const productColor = getProductColor(line.product)

  // Format platform text - replace "Pos." with "Gleis"
  const platformText = platform ? platform.replace("Pos.", "Gleis") : ""

  // Use direction or destination name or fallback
  const destinationText = direction || departure.destination?.name || "Unknown destination"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white font-bold text-sm sm:text-base line-clamp-1 ${productColor}`}
          >
            {line.name}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-sm sm:text-base line-clamp-1">{destinationText}</h3>
              {platform && (
                <Badge variant="secondary" className="w-fit">
                  {platformText}
                </Badge>
              )}
            </div>

            {remarks && remarks.length > 0 && (
              <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {remarks.map((remark, i) => (
                  <span key={i} className="mr-2">
                    {remark.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="text-right flex-shrink-0 ml-1">
            <div className="text-base sm:text-lg font-medium font-mono">{formatTime(when)}</div>
            {delay !== 0 && <div className={`text-xs sm:text-sm font-mono ${delayClass}`}>{formatDelay(delay)}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
