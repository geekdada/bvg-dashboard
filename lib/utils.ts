import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ClassValue } from "clsx"
import type { TransportProduct, Location } from './types'
import { TRANSPORT_PRODUCTS, DELAY_THRESHOLDS, CSS_CLASSES } from './config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Time formatting utilities
export function formatTime(dateString: string): string {
  if (!dateString) return '--:--'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '--:--'
    
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    return '--:--'
  }
}

export function formatDelay(seconds: number | null | undefined): string {
  if (!seconds || seconds === 0) return ""

  const minutes = Math.floor(Math.abs(seconds) / 60)
  const sign = seconds > 0 ? "+" : "-"

  return `${sign}${minutes} min`
}

export function getRelativeTime(dateString: string): string {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffMinutes = Math.round(diffMs / 60000)
    
    if (diffMinutes < 1) return 'now'
    if (diffMinutes === 1) return '1 min'
    return `${diffMinutes} min`
  } catch (error) {
    return ''
  }
}

// Transport product utilities
export function getProductIcon(product: TransportProduct | string): string {
  if (product in TRANSPORT_PRODUCTS) {
    return TRANSPORT_PRODUCTS[product as TransportProduct].icon
  }
  return "?"
}

export function getProductColor(product: TransportProduct | string): string {
  if (product in TRANSPORT_PRODUCTS) {
    return TRANSPORT_PRODUCTS[product as TransportProduct].color
  }
  return "bg-gray-600"
}

export function getProductName(product: TransportProduct | string): string {
  if (product in TRANSPORT_PRODUCTS) {
    return TRANSPORT_PRODUCTS[product as TransportProduct].name
  }
  return product
}

// Delay utilities
export function getDelayClass(delay: number | null | undefined): string {
  if (!delay) return ""
  
  if (delay <= DELAY_THRESHOLDS.ON_TIME) {
    return CSS_CLASSES.delay.onTime
  }
  if (delay <= DELAY_THRESHOLDS.MINOR_DELAY) {
    return CSS_CLASSES.delay.minor
  }
  return CSS_CLASSES.delay.major
}

export function getDelayStatus(delay: number | null | undefined): 'on-time' | 'minor' | 'major' {
  if (!delay || delay <= DELAY_THRESHOLDS.ON_TIME) return 'on-time'
  if (delay <= DELAY_THRESHOLDS.MINOR_DELAY) return 'minor'
  return 'major'
}

// Location utilities
export function formatCoordinates(location: Location): string {
  if (!location?.latitude || !location?.longitude) return ''
  return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
}

export function getGoogleMapsUrl(location: Location, name?: string): string {
  if (!location?.latitude || !location?.longitude) return ''
  
  const query = name 
    ? encodeURIComponent(name) 
    : `${location.latitude},${location.longitude}`
    
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

// Validation utilities
export function isValidStopId(stopId: string): boolean {
  return !!(stopId?.trim() && /^\d+$/.test(stopId.trim()))
}

export function isValidTripId(tripId: string): boolean {
  return !!(tripId?.trim())
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

export function capitalizeFirst(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
