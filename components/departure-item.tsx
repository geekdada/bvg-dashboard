"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Rabbit, Turtle } from "lucide-react"
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

  // Use direction or destination name or fallback
  const destinationText = direction || departure.destination?.name || "Unknown destination"

  // Determine which icon to show based on delay
  const DelayIcon = delay === 0 ? Clock : delay > 0 ? Turtle : Rabbit

  return (
    <Card>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white font-bold text-sm sm:text-base line-clamp-1 text-center ${productColor}`}
          >
            {line.name}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-sm sm:text-base line-clamp-1">{destinationText}</h3>
              {platform && (
                <Badge variant="secondary" className="w-fit">
                  {platform}
                </Badge>
              )}
            </div>

            {remarks && remarks.length > 0 && (
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {remarks.map((remark, i) => (
                  <React.Fragment key={remark.text}>
                    {i !== 0 && <span> | </span>}
                    <span
                      className="[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:dark:hover:text-blue-300"
                      dangerouslySetInnerHTML={{ __html: remark.text }}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="text-right flex-shrink-0 ml-1">
            <div className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded text-base sm:text-lg font-medium font-mono tracking-wider inline-block">
              {formatTime(when)}
            </div>
            {Boolean(delay) && (
              <div
                className={`text-xs sm:text-sm font-mono mt-1 text-center flex items-center justify-center gap-1 ${delayClass}`}
              >
                <DelayIcon className="h-3.5 w-3.5" />
                <span>{formatDelay(delay)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
