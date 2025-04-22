"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { searchStops } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

// Debounce function to throttle API requests
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function StopSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLUListElement>(null)
  const debouncedQuery = useDebounce(query, 300) // 300ms debounce

  const searchForStops = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const data = await searchStops(searchQuery)
      setResults(data)
      // Reset selected index when new results come in
      setSelectedIndex(-1)
    } catch (error) {
      console.error("Error searching for stops:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Effect to trigger search when debounced query changes
  useEffect(() => {
    searchForStops(debouncedQuery)
  }, [debouncedQuery, searchForStops])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsSearching(true)
  }

  const handleInputFocus = () => {
    if (query.length >= 2) {
      setIsSearching(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding results to allow for clicking on them
    setTimeout(() => {
      setIsSearching(false)
    }, 200)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearching || results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          navigateToStop(results[selectedIndex].id)
        }
        break
      case "Escape":
        e.preventDefault()
        setIsSearching(false)
        inputRef.current?.blur()
        break
    }
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

  const navigateToStop = (stopId: string) => {
    setIsSearching(false)
    router.push(`/stops/${stopId}`)
  }

  return (
    <div className="relative mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
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
              className="pl-9 bg-white dark:bg-black border-2 border-black dark:border-bvg-yellow focus-visible:ring-bvg-yellow"
              aria-label="Search for stops"
              aria-autocomplete="list"
              aria-controls={isSearching ? "search-results" : undefined}
              aria-activedescendant={selectedIndex >= 0 ? `result-${selectedIndex}` : undefined}
              role="combobox"
              aria-expanded={isSearching}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {isSearching && (
        <Card className="absolute z-10 w-full mt-1 shadow-lg max-h-80 overflow-auto border-2 border-black dark:border-bvg-yellow">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <ul id="search-results" ref={resultsRef} className="py-1" role="listbox">
                {results.map((stop, index) => (
                  <li
                    key={stop.id}
                    id={`result-${index}`}
                    role="option"
                    aria-selected={selectedIndex === index}
                    className={`${
                      selectedIndex === index ? "bg-bvg-yellow text-black dark:bg-bvg-yellow dark:text-black" : ""
                    } cursor-pointer`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => navigateToStop(stop.id)}
                  >
                    <div className="block px-4 py-2 hover:bg-bvg-yellow hover:text-black">
                      <div className="font-medium">{stop.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">ID: {stop.id}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center text-sm text-gray-500">No stops found</div>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">Type at least 2 characters to search</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
