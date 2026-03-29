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

  const requestLocation = useCallback((silent = false) => {
    if (!navigator.geolocation) {
      if (!silent) {
        setState(prev => ({
          ...prev,
          error: 'Geolocation is not supported by your browser',
          isLoading: false,
        }))
      }
      return
    }

    setState(prev => ({ ...prev, isLoading: !silent, error: null }))

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
        if (silent) {
          setState(prev => ({ ...prev, isLoading: false }))
          return
        }
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

  useEffect(() => {
    if (!navigator.permissions || !navigator.geolocation) return

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        requestLocation(true)
      }
    })
  }, [requestLocation])

  return {
    ...state,
    requestLocation: () => requestLocation(false),
  }
}
