"use client"

import { Card, CardContent } from "@/components/ui/card"
import DepartureItem from "./departure-item"
import { Button } from "@/components/ui/button"
import { RefreshCw, Map } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

interface DepartureListProps {
  departures: any[]
  stopLocation?: {
    latitude: number
    longitude: number
  }
  stopName?: string
}

export default function DepartureList({ departures, stopLocation, stopName }: DepartureListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRefresh = () => {
    startTransition(async () => {
      await router.refresh()
    })
  }

  const openInGoogleMaps = () => {
    if (!stopLocation) return

    const { latitude, longitude } = stopLocation
    const query = stopName ? encodeURIComponent(stopName) : `${latitude},${longitude}`
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Departures</h2>
        <div className="flex gap-2">
          {stopLocation && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3"
              onClick={openInGoogleMaps}
              title="Open in Google Maps"
            >
              <Map className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Map</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3"
            onClick={handleRefresh}
            disabled={isPending}
          >
            <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${isPending ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isPending ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
      </div>

      {departures.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-gray-500">No departures found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {departures.map((departure) => (
            <DepartureItem key={`${departure.tripId}-${departure.plannedWhen}`} departure={departure} />
          ))}
        </div>
      )}
    </div>
  )
}
