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
    <div className="container mx-auto py-8 sm:py-12 px-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground rounded-lg font-bold tracking-tight shadow-sm">
            BVG
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Departures
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Berlin public transport
              <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
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
      <Card className="bvg-card mb-8">
        <CardHeader className="bvg-card-header">
          <CardTitle className="text-md">Service Information</CardTitle>
          <CardDescription className="text-xs">
            Traffic news and timetable changes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex flex-col">
          <a
            href="https://www.bvg.de/en/connections/traffic-news"
            target="_blank"
            rel="noopener noreferrer"
            className="bvg-row group"
          >
            <div>
              <h3 className="text-sm font-medium text-foreground transition-colors">
                BVG Traffic News
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Current disruptions and service updates
              </p>
            </div>
          </a>
          <a
            href="https://sbahn.berlin/en/plan-a-journey/timetable-changes/"
            target="_blank"
            rel="noopener noreferrer"
            className="bvg-row group"
          >
            <div>
              <h3 className="text-sm font-medium text-foreground transition-colors">
                S-Bahn Timetable Changes
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Planned service changes and updates
              </p>
            </div>
          </a>
        </CardContent>
      </Card>

      {/* Popular Stops */}
      <Card className="bvg-card">
        <CardHeader className="bvg-card-header">
          <CardTitle className="text-md">Popular Stops</CardTitle>
          <CardDescription className="text-xs">
            Select a stop to view departures
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex flex-col">
          {POPULAR_STOPS.map((stop) => (
            <Link
              key={stop.id}
              href={`/stops/${stop.id}`}
              className="bvg-row group"
            >
              <div>
                <h3 className="text-sm font-medium text-foreground transition-colors">
                  {stop.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {stop.id}
                </p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
