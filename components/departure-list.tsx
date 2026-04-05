'use client'

import { Card, CardContent } from '@/components/ui/card'
import DepartureItem from './departure-item'
import { BVGButton } from '@/components/ui/bvg-button'
import { RefreshCw, Map } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useMemo, useCallback, useState } from 'react'
import { getGoogleMapsUrl, getProductIcon, getProductName, getProductHexColor } from '@/lib/utils'
import { TRANSPORT_PRODUCTS } from '@/lib/config'
import type { DepartureListProps } from '@/lib/types'
import type { TransportProduct } from '@/lib/types'

export default function DepartureList({
  departures,
  stopLocation,
  stopName,
}: DepartureListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [activeProduct, setActiveProduct] = useState(
    () => searchParams.get('product') || 'all'
  )
  const [activePlatform, setActivePlatform] = useState(
    () => searchParams.get('platform') || 'all'
  )

  const products = useMemo(() => {
    const productSet = new Set(departures.map((d) => d.line.product))
    const productOrder = Object.keys(TRANSPORT_PRODUCTS) as TransportProduct[]
    return productOrder.filter((p) => productSet.has(p))
  }, [departures])

  const platformsForProduct = useMemo(() => {
    if (activeProduct === 'all') return []
    const filtered = departures.filter((d) => d.line.product === activeProduct)
    const platformSet = new Set(
      filtered
        .map((d) => d.platform || d.plannedPlatform)
        .filter((p): p is string => Boolean(p))
    )
    return Array.from(platformSet).sort((a, b) => {
      const numA = parseInt(a, 10)
      const numB = parseInt(b, 10)
      if (!isNaN(numA) && !isNaN(numB) && numA !== numB) return numA - numB
      return a.localeCompare(b)
    })
  }, [departures, activeProduct])

  const filteredDepartures = useMemo(() => {
    let result = departures
    if (activeProduct !== 'all') {
      result = result.filter((d) => d.line.product === activeProduct)
    }
    if (activeProduct !== 'all' && activePlatform !== 'all') {
      result = result.filter(
        (d) => (d.platform || d.plannedPlatform) === activePlatform
      )
    }
    return result
  }, [departures, activeProduct, activePlatform])

  const updateUrl = useCallback(
    (product: string, platform?: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (product === 'all') {
        params.delete('product')
        params.delete('platform')
      } else {
        params.set('product', product)
        if (platform && platform !== 'all') {
          params.set('platform', platform)
        } else {
          params.delete('platform')
        }
      }
      const query = params.toString()
      window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
    },
    [searchParams]
  )

  const handleProductChange = useCallback(
    (product: string) => {
      setActiveProduct(product)
      setActivePlatform('all')
      updateUrl(product)
    },
    [updateUrl]
  )

  const handlePlatformChange = useCallback(
    (platform: string) => {
      setActivePlatform(platform)
      updateUrl(activeProduct, platform)
    },
    [updateUrl, activeProduct]
  )

  const handleRefresh = () => {
    startTransition(async () => {
      await router.refresh()
    })
  }

  const openInGoogleMaps = () => {
    if (!stopLocation) return
    const url = getGoogleMapsUrl(stopLocation, stopName)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const productTabClass = (isActive: boolean) =>
    `flex-shrink-0 inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap transition-all cursor-pointer ${
      isActive
        ? 'bg-primary text-primary-foreground shadow-[0_18px_36px_-24px_hsl(var(--primary)/0.8)]'
        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
    }`

  const platformTabClass = (isActive: boolean) =>
    `flex-shrink-0 inline-flex min-h-10 items-center justify-center rounded-full px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-all cursor-pointer ${
      isActive
        ? 'bg-primary text-primary-foreground shadow-[0_18px_36px_-24px_hsl(var(--primary)/0.8)]'
        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
    }`

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="station-label">Live platform board</div>
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
              Departures
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {departures.length}{' '}
              {departures.length === 1 ? 'service is' : 'services are'} on this
              board right now.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {stopLocation && (
            <BVGButton
              onClick={openInGoogleMaps}
              title="Open in Google Maps"
              className="flex h-10 items-center gap-2 px-4"
              variant="outline"
            >
              <Map className="h-4 w-4" />
              <span>Map</span>
            </BVGButton>
          )}
          <BVGButton
            onClick={handleRefresh}
            disabled={isPending}
            className="flex h-10 items-center gap-2 px-4"
            variant="outline"
          >
            <RefreshCw
              className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`}
            />
            <span>{isPending ? 'Refreshing...' : 'Refresh'}</span>
          </BVGButton>
        </div>
      </div>

      {departures.length === 0 ? (
        <Card className="bvg-card">
          <CardContent className="py-12">
            <div className="mx-auto max-w-md text-center">
              <div className="section-kicker">No live services</div>
              <p className="mt-3 text-sm text-muted-foreground">
                No departures are available for this stop right now. Try a
                refresh or return later.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full">
          <div className="mb-4 overflow-hidden rounded-[1.35rem] border border-border/60 bg-card/75 backdrop-blur-sm">
            <div className="overflow-x-auto p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="inline-flex min-w-max items-center justify-start gap-1.5">
                <button
                  onClick={() => handleProductChange('all')}
                  className={productTabClass(activeProduct === 'all')}
                >
                  All
                </button>
                {products.map((product) => (
                  <button
                    key={product}
                    onClick={() => handleProductChange(product)}
                    className={productTabClass(activeProduct === product)}
                  >
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold leading-none"
                      style={{ backgroundColor: `${getProductHexColor(product)}18`, color: getProductHexColor(product) }}
                    >
                      {getProductIcon(product)}
                    </span>
                    <span>{getProductName(product)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeProduct !== 'all' && platformsForProduct.length > 1 && (
            <div className="mb-6 overflow-hidden rounded-[1.2rem] border border-border/60 bg-muted/20 sm:ml-4">
              <div className="overflow-x-auto p-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="inline-flex min-w-max items-center justify-start gap-1">
                  <button
                    onClick={() => handlePlatformChange('all')}
                    className={platformTabClass(activePlatform === 'all')}
                  >
                    All platforms
                  </button>
                  {platformsForProduct.map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePlatformChange(p)}
                      className={platformTabClass(activePlatform === p)}
                    >
                      Pl. {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {filteredDepartures.map((departure) => (
              <DepartureItem
                key={`${departure.tripId}-${departure.plannedWhen}`}
                departure={departure}
              />
            ))}
            {filteredDepartures.length === 0 && (
              <Card className="bvg-card">
                <CardContent className="py-12">
                  <div className="mx-auto max-w-md text-center">
                    <div className="section-kicker">Filtered out</div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      No departures match the current product or platform
                      selection.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
