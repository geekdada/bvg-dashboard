import type { 
  DeparturesResponse, 
  SearchResponse, 
  TripResponse, 
  APIError 
} from './types'
import { BVG_CONFIG } from './config'

class BVGAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'BVGAPIError'
  }
}

async function handleAPIResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new BVGAPIError(
      `API request failed: ${errorText}`,
      response.status
    )
  }

  try {
    return await response.json()
  } catch (error) {
    throw new BVGAPIError(
      'Failed to parse API response',
      response.status
    )
  }
}

export async function fetchDepartures(stopId: string): Promise<DeparturesResponse> {
  if (!stopId?.trim()) {
    throw new BVGAPIError('Stop ID is required', 400)
  }

  const url = new URL(`${BVG_CONFIG.apiBaseUrl}/stops/${encodeURIComponent(stopId)}/departures`)
  url.searchParams.set('duration', BVG_CONFIG.defaultDuration.toString())

  try {
    const response = await fetch(url.toString())
    return await handleAPIResponse<DeparturesResponse>(response)
  } catch (error) {
    if (error instanceof BVGAPIError) {
      throw error
    }
    throw new BVGAPIError(
      'Network error while fetching departures',
      0
    )
  }
}

export async function searchStops(query: string): Promise<SearchResponse[]> {
  if (!query || query.length < BVG_CONFIG.searchMinLength) {
    return []
  }

  const url = new URL(`${BVG_CONFIG.apiBaseUrl}/locations`)
  url.searchParams.set('query', query.trim())
  url.searchParams.set('addresses', 'false')
  url.searchParams.set('poi', 'false')
  url.searchParams.set('results', BVG_CONFIG.searchMaxResults.toString())
  url.searchParams.set('fuzzy', 'true')

  try {
    const response = await fetch(url.toString())
    return await handleAPIResponse<SearchResponse[]>(response)
  } catch (error) {
    if (error instanceof BVGAPIError) {
      throw error
    }
    throw new BVGAPIError(
      'Network error while searching stops',
      0
    )
  }
}

export async function fetchTripDetails(tripId: string): Promise<TripResponse> {
  if (!tripId?.trim()) {
    throw new BVGAPIError('Trip ID is required', 400)
  }

  const url = new URL(`${BVG_CONFIG.apiBaseUrl}/trips/${encodeURIComponent(tripId)}`)
  url.searchParams.set('stopovers', 'true')
  url.searchParams.set('remarks', 'true')
  url.searchParams.set('polyline', 'false')
  url.searchParams.set('language', 'en')
  url.searchParams.set('pretty', 'true')

  try {
    const response = await fetch(url.toString())
    return await handleAPIResponse<TripResponse>(response)
  } catch (error) {
    if (error instanceof BVGAPIError) {
      throw error
    }
    throw new BVGAPIError(
      'Network error while fetching trip details',
      0
    )
  }
}

export { BVGAPIError }
