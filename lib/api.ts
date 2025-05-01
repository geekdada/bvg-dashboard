export async function fetchDepartures(stopId: string) {
  const response = await fetch(`https://v6.bvg.transport.rest/stops/${stopId}/departures?duration=30`)

  if (!response.ok) {
    throw new Error(`Failed to fetch departures: ${response.status}`)
  }

  const data = await response.json()
  return data
}

export async function searchStops(query: string) {
  // Don't search if query is too short
  if (!query || query.length < 2) return []

  const params = new URLSearchParams({
    query,
    addresses: "false",
    poi: "false",
    results: "10",
    fuzzy: "true",
  })

  const response = await fetch(`https://v6.bvg.transport.rest/locations?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to search stops: ${response.status}`)
  }

  const data = await response.json()
  return data
}

export async function fetchTripDetails(tripId: string) {
  const params = new URLSearchParams({
    stopovers: "true",
    remarks: "true",
    polyline: "false",
    language: "en",
    pretty: "true",
  })

  const response = await fetch(`https://v6.bvg.transport.rest/trips/${tripId}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch trip details: ${response.status}`)
  }

  const data = await response.json()
  return data
}
