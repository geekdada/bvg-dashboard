// BVG API Types
export interface Location {
  type: string
  id?: string
  name?: string
  latitude: number
  longitude: number
}

export interface Stop {
  type: string
  id: string
  name: string
  location: Location
  products?: {
    suburban?: boolean
    subway?: boolean
    tram?: boolean
    bus?: boolean
    ferry?: boolean
    express?: boolean
    regional?: boolean
  }
}

export interface Line {
  type: string
  id: string
  name: string
  public: boolean
  adminCode?: string
  product: TransportProduct
  mode: string
  fahrtNr?: string
  operator?: {
    type: string
    id: string
    name: string
  }
}

export interface Trip {
  id: string
  line: Line
  direction: string
  plannedWhen: string
  when?: string
  delay?: number
  platform?: string
  plannedPlatform?: string
  prognosisType?: string
  origin?: Stop
  destination?: Stop
  currentTripPosition?: Location
  stopovers?: Stopover[]
  occupancy?: 'low' | 'medium' | 'high'
  remarks?: Remark[]
}

export interface Departure {
  tripId: string
  stop: Stop
  when: string | null
  plannedWhen: string
  delay: number | null
  platform: string | null
  plannedPlatform: string | null
  prognosisType: string | null
  direction: string
  line: Line
  remarks?: Remark[]
  origin?: Stop
  destination?: Stop
  currentTripPosition?: Location
}

export interface Remark {
  type: string
  code?: string
  text: string
  summary?: string
}

export interface Stopover {
  stop: Stop
  arrival?: string
  plannedArrival?: string
  arrivalDelay?: number
  departure?: string
  plannedDeparture?: string
  departureDelay?: number
  platform?: string
  plannedPlatform?: string
  prognosisType?: string
  remarks?: Remark[]
}

export interface TripDetails {
  trip: Trip
  stopovers: Stopover[]
  remarks?: Remark[]
}

// API Response Types
export interface DeparturesResponse {
  departures: Departure[]
  realtimeDataUpdatedAt?: string
}

export interface SearchResponse {
  type: string
  id: string
  name: string
  location?: Location
  products?: Stop['products']
}

export interface TripResponse {
  trip: Trip
  stopovers: Stopover[]
  remarks?: Remark[]
}

// Transport Product Types
export type TransportProduct = 
  | 'suburban'
  | 'subway' 
  | 'tram'
  | 'bus'
  | 'ferry'
  | 'express'
  | 'regional'

// UI Component Props Types  
export interface DepartureItemProps {
  departure: Departure
}

export interface DepartureListProps {
  departures: Departure[]
  stopLocation?: Location
  stopName?: string
}

export interface StopHeaderProps {
  stop: Stop
}

export interface StopSearchProps {
  className?: string
}

// Error Types
export interface APIError {
  message: string
  status: number
  code?: string
}

// Hook Types
export interface UseDebounceReturn<T> {
  debouncedValue: T
}

// Configuration Types
export interface BVGConfig {
  apiBaseUrl: string
  defaultDuration: number
  searchMinLength: number
  searchDebounceMs: number
  searchMaxResults: number
}