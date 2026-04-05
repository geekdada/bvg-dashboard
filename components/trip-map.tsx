'use client'

import { useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import Map, { Source, Layer, Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin } from 'lucide-react'
import type { Stopover } from '@/lib/types'

interface TripMapProps {
  stopovers: Stopover[]
  polyline?: any
  lineColor?: string
}

export default function TripMap({
  stopovers,
  polyline,
  lineColor = '#FFD700',
}: TripMapProps) {
  const [mapError, setMapError] = useState(false)
  const { resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  const mapStyle =
    currentTheme === 'dark'
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/light-v11'

  // Mapbox access token
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  // Calculate the bounding box for all stopovers
  const initialViewState = useMemo(() => {
    if (!stopovers || stopovers.length === 0) {
      return {
        longitude: 13.404954, // Default to Berlin center
        latitude: 52.520008,
        zoom: 10,
      }
    }

    const latitudes = stopovers
      .map((s) => s.stop.location?.latitude)
      .filter(Boolean) as number[]
    const longitudes = stopovers
      .map((s) => s.stop.location?.longitude)
      .filter(Boolean) as number[]

    if (latitudes.length === 0 || longitudes.length === 0) {
      return {
        longitude: 13.404954,
        latitude: 52.520008,
        zoom: 10,
      }
    }

    const minLat = Math.min(...latitudes)
    const maxLat = Math.max(...latitudes)
    const minLng = Math.min(...longitudes)
    const maxLng = Math.max(...longitudes)

    return {
      longitude: (minLng + maxLng) / 2,
      latitude: (minLat + maxLat) / 2,
      zoom: 11, // A reasonable default zoom
      bounds: [
        minLng,
        minLat, // southwest
        maxLng,
        maxLat, // northeast
      ] as [number, number, number, number],
      fitBoundsOptions: { padding: 40 },
    }
  }, [stopovers])

  // Convert FeatureCollection of Points into a single LineString
  const lineStringData = useMemo(() => {
    if (!polyline || !polyline.features) return null

    const coordinates = polyline.features
      .map((f: any) => f.geometry?.coordinates)
      .filter(Boolean)

    if (coordinates.length < 2) return null

    return {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates,
      },
    }
  }, [polyline])

  const handleError = (e: any) => {
    console.error('Mapbox error:', e)

    // Attempt to parse out status or message
    const status = e?.error?.status
    const message = e?.error?.message?.toLowerCase() || ''
    const errorText = e?.errorText?.toLowerCase() || ''

    // Check if error is related to quota, unauthorized or rate limit
    if (
      status === 429 ||
      status === 401 ||
      message.includes('unauthorized') ||
      message.includes('rate limit') ||
      message.includes('quota') ||
      errorText.includes('unauthorized') ||
      errorText.includes('rate limit')
    ) {
      setMapError(true)
    }
  }

  // If map error (like quota exceeded) or no token, gracefully fallback
  if (!mapboxToken || mapError) {
    return (
      <div className="flex h-[320px] w-full flex-col items-center justify-center rounded-[1.35rem] border border-border/60 bg-muted/20 p-4 text-center text-muted-foreground">
        <MapPin className="mb-2 h-8 w-8 opacity-50" />
        <p className="text-sm font-medium">Map preview currently unavailable</p>
        {!mapboxToken && (
          <p className="text-xs mt-1">Mapbox access token is not configured.</p>
        )}
        {mapError && <p className="text-xs mt-1">Map service limit reached.</p>}
      </div>
    )
  }

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[1.35rem] border border-border/60 bg-muted/20 md:h-[420px]">
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        onError={handleError}
      >
        {lineStringData && (
          <Source id="route" type="geojson" data={lineStringData}>
            <Layer
              id="route-line"
              type="line"
              layout={{
                'line-join': 'round',
                'line-cap': 'round',
              }}
              paint={{
                'line-color': lineColor,
                'line-width': 4,
                'line-opacity': 0.8,
              }}
            />
          </Source>
        )}

        {stopovers.map((stopover, index) => {
          const lat = stopover.stop.location?.latitude
          const lng = stopover.stop.location?.longitude

          if (!lat || !lng) return null

          const isFirstOrLast = index === 0 || index === stopovers.length - 1

          return (
            <Marker
              key={stopover.stop.id + index}
              longitude={lng}
              latitude={lat}
              anchor="center"
            >
              <div
                className={`rounded-full shadow-sm ${
                  isFirstOrLast
                    ? 'w-4 h-4 z-10 border-2 border-background'
                    : 'w-2.5 h-2.5 z-0 border-[1.5px] border-background'
                }`}
                style={{
                  backgroundColor: isFirstOrLast
                    ? currentTheme === 'dark'
                      ? '#FFFFFF'
                      : '#000000'
                    : lineColor,
                }}
                title={stopover.stop.name}
              />
            </Marker>
          )
        })}
      </Map>
    </div>
  )
}
