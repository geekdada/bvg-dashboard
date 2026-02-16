import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import StopSearch from '@/components/stop-search'
import NearbyStops from '@/components/nearby-stops'
import { ThemeToggle } from '@/components/theme-toggle'
import { POPULAR_STOPS } from '@/lib/config'
import { Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto py-6 sm:py-8 px-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-black text-bvg-yellow px-4 py-2.5 text-2xl font-bold rounded-xl tracking-tight">
            BVG
          </div>
          <Heart className="h-5 w-5 text-bvg-yellow fill-bvg-yellow" />
          <div>
            <h1 className="text-xl sm:text-2xl bvg-heading">Departures</h1>
            <p className="text-sm bvg-text-secondary">
              Berlin public transport
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Search */}
      <StopSearch />

      {/* Nearby Stops */}
      <NearbyStops />

      {/* Service Information */}
      <Card className="bvg-card mb-6 overflow-hidden">
        <CardHeader className="bvg-card-header">
          <CardTitle className="text-base sm:text-lg">
            Service Information
          </CardTitle>
          <CardDescription className="text-xs bvg-text-secondary">
            Traffic news and timetable changes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <a
            href="https://www.bvg.de/en/connections/traffic-news"
            target="_blank"
            rel="noopener noreferrer"
            className="block bvg-row border-b border-black dark:border-bvg-yellow"
          >
            <h3 className="font-medium">BVG Traffic News</h3>
            <p className="text-sm bvg-text-muted mt-1">
              Current disruptions and service updates
            </p>
          </a>
          <a
            href="https://sbahn.berlin/en/plan-a-journey/timetable-changes/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bvg-row"
          >
            <h3 className="font-medium">S-Bahn Timetable Changes</h3>
            <p className="text-sm bvg-text-muted mt-1">
              Planned service changes and updates
            </p>
          </a>
        </CardContent>
      </Card>

      {/* Popular Stops */}
      <Card className="bvg-card overflow-hidden">
        <CardHeader className="bvg-card-header">
          <CardTitle className="text-base sm:text-lg">Popular Stops</CardTitle>
          <CardDescription className="text-xs bvg-text-secondary">
            Select a stop to view departures
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-black dark:divide-bvg-yellow">
            {POPULAR_STOPS.map((stop) => (
              <Link
                key={stop.id}
                href={`/stops/${stop.id}`}
                className="block bvg-row"
              >
                <h3 className="font-medium">{stop.name}</h3>
                <p className="text-sm bvg-text-muted mt-1">{stop.id}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
