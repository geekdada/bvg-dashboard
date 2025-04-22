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
      <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-3xl">
        <div className="bg-black text-bvg-yellow p-4 mb-4 sm:mb-6 rounded-md">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 mb-2 sm:mb-4 -ml-2 h-8 bg-transparent text-bvg-yellow border-bvg-yellow hover:bg-bvg-yellow hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Button>
          </Link>
          <StopHeader stop={stopInfo} />
        </div>
        <DepartureList departures={data.departures || []} stopLocation={stopInfo.location} stopName={stopInfo.name} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return (
      <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-3xl">
        <div className="bg-black text-bvg-yellow p-4 mb-4 sm:mb-6 rounded-md">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 mb-2 sm:mb-4 -ml-2 h-8 bg-transparent text-bvg-yellow border-bvg-yellow hover:bg-bvg-yellow hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Error Loading Departures</h1>
        </div>
        <p className="text-red-500">
          Could not load departures for stop ID: {stopId}. Please check if the stop ID is correct.
        </p>
      </div>
    )
  }
}
