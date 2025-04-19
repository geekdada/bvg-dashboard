"use client"

import { Card, CardContent } from "@/components/ui/card"
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
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold ${productColor}`}
          >
            {line.name}
          </div>

          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">{destinationText}</h3>
              {platform && (
                <span className="ml-2 text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded font-mono">
                  {platformText}
                </span>
              )}
            </div>

            {remarks && remarks.length > 0 && (
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {remarks.map((remark, i) => (
                  <span key={i} className="mr-2">
                    {remark.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="text-lg font-medium font-mono">{formatTime(when)}</div>
            {delay !== 0 && <div className={`text-sm font-mono ${delayClass}`}>{formatDelay(delay)}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
