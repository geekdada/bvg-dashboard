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
    <Card className="bvg-card mb-8">
      <CardHeader className="bvg-card-header flex flex-row items-center justify-between py-4">
        <div>
          <CardTitle className="text-sm font-medium">Nearby Stops</CardTitle>
          <CardDescription className="text-xs">
            Find stops closest to your current location
          </CardDescription>
        </div>
        <Button
          onClick={handleRequestLocation}
          variant="ghost"
          size="sm"
          className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          {isLoading ? 'Locating...' : 'Update'}
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
              <div>
                <h3 className="text-sm font-medium text-foreground transition-colors">{stop.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{stop.id}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            {isLoading ? (
              <p className="text-sm text-muted-foreground animate-pulse">Finding nearby stops...</p>
            ) : error ? (
              <div className="space-y-4 px-4">
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
              <div className="space-y-4 px-4">
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
              <Button
                onClick={handleRequestLocation}
                variant="outline"
                size="sm"
                className="bvg-btn-outline"
              >
                Request Location
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
