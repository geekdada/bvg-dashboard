'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/use-geolocation'
import { findNearbyStops } from '@/lib/api'
import type { SearchResponse } from '@/lib/types'

export default function NearbyStops() {
  const { latitude, longitude, error, isLoading: geoLoading, requestLocation } = useGeolocation()
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
    <Card className="border-none shadow-md bvg-card mb-6">
      <CardHeader className="pb-2 sm:pb-4 bg-black text-bvg-yellow">
        <CardTitle className="text-lg sm:text-xl">Nearby Stops</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-300">
          Find stops closest to your current location
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {stops.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {stops.map((stop) => (
              <Link
                key={stop.id}
                href={`/stops/${stop.id}`}
                className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="font-medium text-sm sm:text-base">{stop.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {stop.id}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            {isLoading ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Finding nearby stops...</p>
            ) : error ? (
              <div className="space-y-2">
                <p className="text-sm text-red-500">{error}</p>
                <Button onClick={handleRequestLocation} variant="outline" size="sm">
                  Try Again
                </Button>
              </div>
            ) : stopsError ? (
              <div className="space-y-2">
                <p className="text-sm text-red-500">{stopsError}</p>
                <Button onClick={() => latitude && longitude && fetchNearbyStops(latitude, longitude)} variant="outline" size="sm">
                  Try Again
                </Button>
              </div>
            ) : (
              <Button onClick={handleRequestLocation} variant="outline" className="border-bvg-yellow text-black hover:bg-bvg-yellow">
                Request Location
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
