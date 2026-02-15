import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StopSearch from "@/components/stop-search"
import { POPULAR_STOPS } from "@/lib/config"

export default function Home() {
  return (
    <div className="container mx-auto py-6 sm:py-12 px-4 max-w-3xl">
      <div className="flex items-center mb-6 sm:mb-8">
        <div className="bg-black text-bvg-yellow p-2 mr-3 text-2xl font-bold">BVG</div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Departures Dashboard</h1>
          <p className="text-sm sm:text-base text-black dark:text-bvg-yellow">
            Real-time departures for Berlin public transport
          </p>
        </div>
      </div>

      <StopSearch />

      <Card className="border-none shadow-md bvg-card mb-6">
        <CardHeader className="pb-2 sm:pb-4 bg-black text-bvg-yellow">
          <CardTitle className="text-lg sm:text-xl">Service Information</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-300">
            Traffic news and timetable changes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <a
              href="https://www.bvg.de/en/connections/traffic-news"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-medium text-sm sm:text-base">BVG Traffic News</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Current disruptions and service updates
              </p>
            </a>
            <a
              href="https://sbahn.berlin/en/plan-a-journey/timetable-changes/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-medium text-sm sm:text-base">S-Bahn Timetable Changes</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Planned service changes and updates
              </p>
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bvg-card">
        <CardHeader className="pb-2 sm:pb-4 bg-black text-bvg-yellow">
          <CardTitle className="text-lg sm:text-xl">Popular Stops</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-300">
            Select a stop to view departures
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px p-px bg-gray-200 dark:bg-gray-700">
            {POPULAR_STOPS.map((stop) => (
              <Link
                key={stop.id}
                href={`/stops/${stop.id}`}
                className="block p-4 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="font-medium text-sm sm:text-base">{stop.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {stop.id}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
