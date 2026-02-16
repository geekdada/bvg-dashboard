import { notFound } from "next/navigation"
import Link from "next/link"
import DepartureList from "@/components/departure-list"
import StopHeader from "@/components/stop-header"
import { fetchDepartures } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function StopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stopId = id

  if (!stopId) {
    return notFound()
  }

  try {
    // Fetch all data in one request
    const data = await fetchDepartures(stopId)

    // Extract stop info from the first departure if available
    const stopInfo =
      data.departures && data.departures.length > 0 ? data.departures[0].stop : undefined

    if (!stopInfo) {
      return notFound()
    }

    return (
      <div className="container mx-auto py-4 px-4 max-w-3xl">
        {/* Header */}
        <div className="bvg-card p-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bvg-btn-outline mb-4"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <StopHeader stop={stopInfo} />
        </div>

        <DepartureList departures={data.departures || []} stopLocation={stopInfo.location} stopName={stopInfo.name} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return (
      <div className="container mx-auto py-4 px-4 max-w-3xl">
        <div className="bvg-card p-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bvg-btn-outline mb-4"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-red-500">Error Loading Departures</h1>
        </div>
        <p className="text-red-500">
          Could not load departures for stop ID: {stopId}. Please check if the stop ID is correct.
        </p>
      </div>
    )
  }
}
