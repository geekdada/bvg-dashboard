'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/use-geolocation'
import { findNearbyStops } from '@/lib/api'
import type { SearchResponse } from '@/lib/types'
import { ArrowUpRight, LocateFixed } from 'lucide-react'

export default function NearbyStops() {
  const {
    latitude,
    longitude,
    error,
    isLoading: geoLoading,
    requestLocation,
  } = useGeolocation()
  const [stops, setStops] = useState<SearchResponse[]>([])
  const [stopsLoading, setStopsLoading] = useState(false)
  const [stopsError, setStopsError] = useState<string | null>(null)

  const fetchNearbyStops = useCallback(async (lat: number, lon: number) => {
    setStopsLoading(true)
    setStopsError(null)
    try {
      const nearbyStops = await findNearbyStops(lat, lon, 3)
      setStops(nearbyStops)
    } catch {
      setStopsError('Failed to find nearby stops')
    } finally {
      setStopsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchNearbyStops(latitude, longitude)
    }
  }, [latitude, longitude, fetchNearbyStops])

  const handleRequestLocation = () => {
    requestLocation()
  }

  const isLoading = geoLoading || stopsLoading

  return (
    <Card className="bvg-card">
      <CardHeader className="bvg-card-header flex flex-row items-center justify-between gap-4 py-4">
        <div>
          <div className="section-kicker">Closest board</div>
          <CardTitle className="mt-2 text-md">Nearby stops</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Find the nearest station boards from your current location.
          </CardDescription>
        </div>
        <Button
          onClick={handleRequestLocation}
          variant="outline"
          size="sm"
          className="h-9 gap-2 px-3.5 bvg-btn-outline"
          disabled={isLoading}
        >
          <LocateFixed className="h-3.5 w-3.5" />
          {isLoading ? 'Locating...' : 'Locate me'}
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex flex-col">
        {stops.length > 0 ? (
          stops.map((stop) => (
            <Link
              key={stop.id}
              href={`/stops/${stop.id}`}
              className="bvg-row group"
            >
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-foreground transition-colors">
                  {stop.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
                  {stop.id}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          ))
        ) : (
          <div className="px-5 py-8 text-center">
            {isLoading ? (
              <div className="panel-inset p-5">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Finding nearby stops...
                </p>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <p className="text-sm text-destructive">{error}</p>
                <Button
                  onClick={handleRequestLocation}
                  variant="outline"
                  size="sm"
                  className="bvg-btn-outline"
                >
                  Try Again
                </Button>
              </div>
            ) : stopsError ? (
              <div className="space-y-4">
                <p className="text-sm text-destructive">{stopsError}</p>
                <Button
                  onClick={() =>
                    latitude &&
                    longitude &&
                    fetchNearbyStops(latitude, longitude)
                  }
                  variant="outline"
                  size="sm"
                  className="bvg-btn-outline"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="panel-inset space-y-4 p-5">
                <p className="text-sm text-muted-foreground">
                  Let the app use your location to surface the closest Berlin
                  stops.
                </p>
                <Button
                  onClick={handleRequestLocation}
                  variant="outline"
                  size="sm"
                  className="bvg-btn-outline"
                >
                  Request location
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
