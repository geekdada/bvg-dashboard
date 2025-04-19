export async function fetchDepartures(stopId: string) {
  const response = await fetch(`https://v6.bvg.transport.rest/stops/${stopId}/departures`, {
    next: { revalidate: 30 }, // Revalidate every 30 seconds
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch departures: ${response.status}`)
  }

  const data = await response.json()
  return data
}

// We don't need a separate fetchStopInfo function anymore
