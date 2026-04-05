'use client'

import React, { useCallback, useState } from 'react'
import { Copy, Languages, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Remark {
  text?: string
  summary?: string
}

interface RemarksDisplayProps {
  remarks?: Remark[]
  className?: string
}

export default function RemarksDisplay({
  remarks,
  className = '',
}: RemarksDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' || target.closest('a')) {
      const anchor = target.tagName === 'A' ? target : target.closest('a')
      if (
        anchor instanceof HTMLAnchorElement &&
        anchor.href &&
        !anchor.href.startsWith(window.location.origin)
      ) {
        e.stopPropagation()
        e.preventDefault()
        window.open(anchor.href, '_blank', 'noopener,noreferrer')
      }
    }
  }, [])

  const getPlainText = useCallback(() => {
    if (!remarks) return ''
    return remarks
      .map((r) => r.text || r.summary || '')
      .join(' | ')
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .trim()
  }, [remarks])

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const textToCopy = getPlainText()

      try {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy', err)
      }
    },
    [getPlainText]
  )

  const handleTranslate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const textToTranslate = getPlainText()

      const url = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(
        textToTranslate
      )}&op=translate`
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [getPlainText]
  )

  if (!remarks || remarks.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-[1.1rem] border border-border/60 bg-muted/30 p-3 lg:px-4 lg:py-4',
        className
      )}
    >
      <div
        className="text-xs sm:text-sm text-muted-foreground"
        onClick={handleClick}
      >
        {remarks.map((remark, i) => (
          <React.Fragment key={i}>
            {i !== 0 && <span> | </span>}
            <span
              className="[&_a]:relative [&_a]:z-10 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:opacity-80 [&_a]:text-[hsl(var(--signal-ink))]"
              dangerouslySetInnerHTML={{
                __html: remark.text || remark.summary || '',
              }}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-foreground sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-2"
          title="Copy remarks"
          aria-label="Copy remarks"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
        <button
          onClick={handleTranslate}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-foreground sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-2"
          title="Translate remarks"
          aria-label="Translate remarks"
        >
          <Languages className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Translate</span>
        </button>
      </div>
    </div>
  )
}
