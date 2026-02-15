'use client'

import { useState, useEffect, useCallback } from 'react'

export interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  isLoading: boolean
}

export interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void
}

export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: false,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          isLoading: false,
        })
      },
      (error) => {
        let errorMessage: string
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
          default:
            errorMessage = 'An unknown error occurred'
        }
        setState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }))
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    )
  }, [])

  return {
    ...state,
    requestLocation,
  }
}
