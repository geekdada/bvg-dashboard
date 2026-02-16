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
    <Card className="bvg-card mb-6 overflow-hidden">
      <CardHeader className="bvg-card-header">
        <CardTitle className="text-base sm:text-lg">Nearby Stops</CardTitle>
        <CardDescription className="text-xs text-gray-300">
          Find stops closest to your current location
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {stops.length > 0 ? (
          <div className="divide-y divide-black dark:divide-bvg-yellow">
            {stops.map((stop) => (
              <Link
                key={stop.id}
                href={`/stops/${stop.id}`}
                className="block bvg-row"
              >
                <h3 className="font-medium bvg-text">{stop.name}</h3>
                <p className="text-sm bvg-text-muted mt-1">{stop.id}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            {isLoading ? (
              <p className="bvg-text-secondary">Finding nearby stops...</p>
            ) : error ? (
              <div className="space-y-3">
                <p className="text-sm text-red-500">{error}</p>
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
              <div className="space-y-3">
                <p className="text-sm text-red-500">{stopsError}</p>
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
