"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { searchStops } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { BVG_CONFIG } from "@/lib/config"
import type { SearchResponse } from "@/lib/types"

export default function StopSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLUListElement>(null)
  const debouncedQuery = useDebounce(query, BVG_CONFIG.searchDebounceMs)

  const navigateToStop = useCallback((stopId: string) => {
    setIsSearching(false)
    router.push(`/stops/${stopId}`, { scroll: true })
  }, [router])

  const { selectedIndex, setSelectedIndex, handleKeyDown, resetSelection } = useKeyboardNavigation({
    itemCount: results.length,
    onSelect: (index) => navigateToStop(results[index].id),
    onEscape: () => {
      setIsSearching(false)
      inputRef.current?.blur()
    },
  })

  const searchForStops = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < BVG_CONFIG.searchMinLength) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const data = await searchStops(searchQuery)
      setResults(data)
      resetSelection()
    } catch (error) {
      console.error("Error searching for stops:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [resetSelection])

  // Effect to trigger search when debounced query changes
  useEffect(() => {
    searchForStops(debouncedQuery)
  }, [debouncedQuery, searchForStops])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsSearching(true)
  }

  const handleInputFocus = () => {
    if (query.length >= BVG_CONFIG.searchMinLength) {
      setIsSearching(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding results to allow for clicking on them
    setTimeout(() => {
      setIsSearching(false)
    }, 200)
  }

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
        })
      }
    }
  }, [selectedIndex])


  return (
    <div className="relative mb-6">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for stops..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="pl-10 bg-background/50 border border-border/60 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-foreground rounded-lg h-11 shadow-sm transition-all"
          aria-label="Search for stops"
          aria-autocomplete="list"
          aria-controls={isSearching ? "search-results" : undefined}
          aria-activedescendant={selectedIndex >= 0 ? `result-${selectedIndex}` : undefined}
          role="combobox"
          aria-expanded={isSearching}
        />
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {isSearching && (
        <Card className="absolute z-10 w-full mt-2 bvg-card max-h-80 overflow-auto shadow-lg shadow-black/5 dark:shadow-black/40 border-border/60">
          <CardContent className="p-0 flex flex-col">
            {isLoading ? (
              <div className="p-6">
                <LoadingSpinner text="Searching..." />
              </div>
            ) : results.length > 0 ? (
              <ul id="search-results" ref={resultsRef} role="listbox">
                {results.map((stop, index) => (
                  <li
                    key={stop.id}
                    id={`result-${index}`}
                    role="option"
                    aria-selected={selectedIndex === index}
                    className={`bvg-row group ${
                      selectedIndex === index ? "bg-muted/60" : ""
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => navigateToStop(stop.id)}
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground transition-colors">{stop.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 font-mono">{stop.id}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : query.length >= BVG_CONFIG.searchMinLength ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No stops found</div>
            ) : (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Type at least {BVG_CONFIG.searchMinLength} characters to search
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
