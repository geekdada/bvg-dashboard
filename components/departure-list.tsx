"use client"

import { Card, CardContent } from "@/components/ui/card"
import DepartureItem from "./departure-item"
import { BVGButton } from "@/components/ui/bvg-button"
import { RefreshCw, Map } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { getGoogleMapsUrl } from "@/lib/utils"
import type { DepartureListProps } from "@/lib/types"

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

    const url = getGoogleMapsUrl(stopLocation, stopName)
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg bvg-heading">Departures</h2>
        <div className="flex gap-2">
          {stopLocation && (
            <BVGButton
              onClick={openInGoogleMaps}
              title="Open in Google Maps"
              className="flex items-center gap-2"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </BVGButton>
          )}
          <BVGButton
            onClick={handleRefresh}
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isPending ? "Refreshing..." : "Refresh"}</span>
          </BVGButton>
        </div>
      </div>

      {departures.length === 0 ? (
        <Card className="bvg-card">
          <CardContent className="py-8">
            <p className="text-center bvg-text-muted">No departures found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {departures.map((departure) => (
            <DepartureItem key={`${departure.tripId}-${departure.plannedWhen}`} departure={departure} />
          ))}
        </div>
      )}
    </div>
  )
}
