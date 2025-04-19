import { notFound } from "next/navigation"
import Link from "next/link"
import DepartureList from "@/components/departure-list"
import StopHeader from "@/components/stop-header"
import { fetchDepartures } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function StopPage({ params }: { params: { id: string } }) {
  const stopId = params.id

  if (!stopId) {
    notFound()
  }

  try {
    // Fetch all data in one request
    const data = await fetchDepartures(stopId)

    // Extract stop info from the first departure if available
    const stopInfo =
      data.departures && data.departures.length > 0 ? data.departures[0].stop : { id: stopId, name: `Stop ${stopId}` }

    return (
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <StopHeader stop={stopInfo} />
        </div>
        <DepartureList departures={data.departures || []} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return (
      <div className="container mx-auto py-6 px-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold mb-6">Error Loading Departures</h1>
        <p className="text-red-500">
          Could not load departures for stop ID: {stopId}. Please check if the stop ID is correct.
        </p>
      </div>
    )
  }
}
