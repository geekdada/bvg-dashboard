import { MapPin } from "lucide-react"

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
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground line-clamp-2">{stop.name}</h1>
      {stop.location && (
        <div className="flex items-center text-sm text-muted-foreground mt-2 font-mono">
          <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
          <span className="truncate">
            {stop.location.latitude.toFixed(6)}, {stop.location.longitude.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  )
}
