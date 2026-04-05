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
import { ArrowUpRight, Clock3, MapPinned } from 'lucide-react'

export default function Home() {
  return (
    <div className="page-shell">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="bvg-card p-6 sm:p-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-4">
                <div className="station-label">Berlin underground board</div>
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] bg-primary text-lg font-semibold tracking-[-0.08em] text-primary-foreground shadow-[0_20px_40px_-24px_hsl(var(--primary)/0.72)]">
                    U
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h1 className="section-title">Berlin departures</h1>
                      <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                        Real-time departures with a calmer night-platform feel:
                        clearer scan lines, stronger timing cues, and quick
                        routes into the stops you use most.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="station-chip">Live board</span>
                      <span className="station-chip">Low-light contrast</span>
                      <span className="station-chip">Fast stop lookup</span>
                    </div>
                  </div>
                </div>
              </div>
              <ThemeToggle />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="panel-inset p-4">
                <div className="section-kicker">Search</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Jump straight to a stop or station with keyboard-friendly
                  results.
                </p>
              </div>
              <div className="panel-inset p-4">
                <div className="section-kicker">Coverage</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  U-Bahn, S-Bahn, tram, bus, ferry, and regional departures in
                  one board.
                </p>
              </div>
              <div className="panel-inset p-4">
                <div className="section-kicker">Focus</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dense enough for commuters, quiet enough to read at a glance.
                </p>
              </div>
            </div>

            <StopSearch />
          </div>
        </section>

        <Card className="bvg-card h-full">
          <CardHeader className="bvg-card-header">
            <CardTitle>Traffic and timetable</CardTitle>
            <CardDescription>
              Quick access to service updates before you head underground.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <a
              href="https://www.bvg.de/en/connections/traffic-news"
              target="_blank"
              rel="noopener noreferrer"
              className="bvg-row group"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-foreground">
                  BVG traffic news
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Current disruptions, maintenance windows, and line changes.
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
            <a
              href="https://sbahn.berlin/en/plan-a-journey/timetable-changes/"
              target="_blank"
              rel="noopener noreferrer"
              className="bvg-row group"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-foreground">
                  S-Bahn timetable changes
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Planned adjustments and ongoing works across the network.
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
            <div className="px-5 py-5">
              <div className="panel-inset flex items-start gap-3 p-4">
                <MapPinned className="signal-text mt-0.5 h-4 w-4" />
                <p className="text-sm text-muted-foreground">
                  Use nearby stops when you want the closest board fast, or pin
                  a favorite from the popular list below.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <NearbyStops />

        <Card className="bvg-card">
          <CardHeader className="bvg-card-header">
            <CardTitle>Popular stops</CardTitle>
            <CardDescription>
              Fast links for common station boards around Berlin.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {POPULAR_STOPS.map((stop, index) => (
              <Link
                key={stop.id}
                href={`/stops/${stop.id}`}
                className="bvg-row group"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="signal-text flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-primary/20 bg-primary/10 text-sm font-semibold tracking-[-0.04em]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-foreground">
                      {stop.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
                      {stop.id}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
