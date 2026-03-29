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
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground line-clamp-2">
        {stop.name}
      </h1>
    </div>
  )
}
