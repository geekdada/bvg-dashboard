import type { BVGConfig, TransportProduct } from './types'

export const BVG_CONFIG: BVGConfig = {
  apiBaseUrl: 'https://v6.bvg.transport.rest',
  defaultDuration: 30,
  searchMinLength: 2,
  searchDebounceMs: 300,
  searchMaxResults: 10,
}

export const TRANSPORT_PRODUCTS: Record<TransportProduct, { 
  icon: string
  name: string
  color: string
}> = {
  suburban: {
    icon: 'S',
    name: 'S-Bahn',
    color: 'bg-transport-suburban'
  },
  subway: {
    icon: 'U',
    name: 'U-Bahn',
    color: 'bg-transport-subway'
  },
  tram: {
    icon: 'T',
    name: 'Tram',
    color: 'bg-transport-tram'
  },
  bus: {
    icon: 'B',
    name: 'Bus',
    color: 'bg-transport-bus'
  },
  ferry: {
    icon: 'F',
    name: 'Ferry',
    color: 'bg-transport-ferry'
  },
  express: {
    icon: 'E',
    name: 'Express',
    color: 'bg-transport-express'
  },
  regional: {
    icon: 'R',
    name: 'Regional',
    color: 'bg-transport-regional'
  }
}

export const POPULAR_STOPS = [
  { id: "900260009", name: "Flughafen BER" },
  { id: "900100009", name: "U Naturkundemuseum" },
  { id: "900100501", name: "U Schwartzkopffstr." },
  { id: "900100023", name: "U Rosenthaler Platz" },
  { id: "900003201", name: "S+U Berlin Hauptbahnhof" },
] as const

export const DELAY_THRESHOLDS = {
  ON_TIME: 0,
  MINOR_DELAY: 180, // 3 minutes
  MAJOR_DELAY: 300, // 5 minutes
} as const

export const CSS_CLASSES = {
  delay: {
    onTime: 'text-green-600',
    minor: 'text-yellow-600',
    major: 'text-red-600',
  },
  button: {
    primary: 'bg-transparent text-bvg-yellow border-bvg-yellow hover:bg-bvg-yellow hover:text-black',
  },
  card: {
    bvg: 'border-none shadow-md bvg-card',
  }
} as const