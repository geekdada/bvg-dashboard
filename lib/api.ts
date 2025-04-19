export async function fetchDepartures(stopId: string) {
  const response = await fetch(`https://v6.bvg.transport.rest/stops/${stopId}/departures?duration=30`, {
    next: { revalidate: 30 }, // Revalidate every 30 seconds
  })

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
