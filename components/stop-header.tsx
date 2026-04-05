import { MapPin } from 'lucide-react'

interface StopHeaderProps {
  stop: {
    id: string
    name: string
    location?: {
      latitude: number
      longitude: number
    }
  }
}

export default function StopHeader({ stop }: StopHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-4">
        <div className="station-label">Platform board</div>
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] bg-primary text-lg font-semibold tracking-[-0.08em] text-primary-foreground shadow-[0_20px_40px_-24px_hsl(var(--primary)/0.72)]">
            BVG
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl line-clamp-2">
              {stop.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className="station-chip">
                Stop ID
                <span className="font-mono tabular-nums text-foreground">
                  {stop.id}
                </span>
              </span>
              {stop.location && (
                <span className="station-chip">
                  <MapPin className="h-3.5 w-3.5" />
                  Berlin
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-sm panel-inset p-4">
        <div className="section-kicker">Live departures</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the filters below to narrow the board by transport type or
          platform without losing the fast scan.
        </p>
      </div>
    </div>
  )
}
