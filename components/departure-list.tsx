'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DepartureItem from './departure-item'
import { BVGButton } from '@/components/ui/bvg-button'
import { RefreshCw, Map } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition, useMemo } from 'react'
import { getGoogleMapsUrl } from '@/lib/utils'
import type { DepartureListProps } from '@/lib/types'

export default function DepartureList({
  departures,
  stopLocation,
  stopName,
}: DepartureListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const platforms = useMemo(() => {
    const allPlatforms = departures
      .map((d) => d.platform || d.plannedPlatform)
      .filter((p): p is string => Boolean(p))

    return Array.from(new Set(allPlatforms)).sort((a, b) => {
      const numA = parseInt(a, 10)
      const numB = parseInt(b, 10)
      if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
        return numA - numB
      }
      return a.localeCompare(b)
    })
  }, [departures])

  const handleRefresh = () => {
    startTransition(async () => {
      await router.refresh()
    })
  }

  const openInGoogleMaps = () => {
    if (!stopLocation) return

    const url = getGoogleMapsUrl(stopLocation, stopName)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
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
            <RefreshCw
              className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">
              {isPending ? 'Refreshing...' : 'Refresh'}
            </span>
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
        <Tabs defaultValue="all" className="w-full">
          <div className="mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-md overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TabsList className="inline-flex h-10 items-center justify-start bg-muted p-1 text-muted-foreground w-max min-w-full sm:min-w-0">
              <TabsTrigger value="all" className="flex-shrink-0">
                All Platforms
              </TabsTrigger>
              {platforms.map((p) => (
                <TabsTrigger key={p} value={p} className="flex-shrink-0">
                  Platform {p}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0 space-y-3">
            {departures.map((departure) => (
              <DepartureItem
                key={`${departure.tripId}-${departure.plannedWhen}`}
                departure={departure}
              />
            ))}
          </TabsContent>

          {platforms.map((p) => {
            const platformDepartures = departures.filter(
              (d) => (d.platform || d.plannedPlatform) === p
            )
            return (
              <TabsContent key={p} value={p} className="m-0 space-y-3">
                {platformDepartures.map((departure) => (
                  <DepartureItem
                    key={`${departure.tripId}-${departure.plannedWhen}`}
                    departure={departure}
                  />
                ))}
              </TabsContent>
            )
          })}
        </Tabs>
      )}
    </div>
  )
}
