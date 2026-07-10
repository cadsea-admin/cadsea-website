'use client'

import { useState } from 'react'
import PosterLightbox from '@/app/components/PosterLightbox'
import type { NotionEvent } from '@/lib/notion'

type Props = {
  event: NotionEvent
  html: string
  relatedEvent: NotionEvent | null
  relatedHtml: string
}

const proseClass =
  'prose prose-slate max-w-none prose-headings:text-navy prose-a:text-navy [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:w-auto [&_img]:h-auto [&_img]:rounded-xl'

export default function RecapDetailClient({ event, html, relatedEvent, relatedHtml }: Props) {
  const [showRelated, setShowRelated] = useState(false)
  const expanded = showRelated && !!relatedEvent && !!relatedHtml

  return (
    <div className={`mx-auto px-6 py-10 transition-all duration-300 ${expanded ? 'max-w-7xl' : 'max-w-4xl'}`}>

      {/* Poster */}
      {event.image && (
        <div className="mb-8">
          <PosterLightbox src={event.image} alt={event.title} />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 bg-blue-100 text-blue-600">
          Recap
        </span>
        <h1 className="text-navy text-3xl md:text-4xl font-bold leading-tight mb-6">{event.title}</h1>

        {/* Meta + Related button */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Left: date only */}
          <div className="flex flex-col gap-3 flex-1">
            {event.date && (
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-9 h-9 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium">{event.date}</span>
              </div>
            )}
          </div>

          {/* Right: toggle button where map was */}
          {relatedEvent && (
            <button
              onClick={() => setShowRelated(!showRelated)}
              className={`w-full md:w-72 lg:w-96 shrink-0 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 p-6 h-36 md:h-auto cursor-pointer ${
                showRelated
                  ? 'border-navy bg-navy text-white'
                  : 'border-dashed border-slate-200 bg-slate-50 hover:border-navy text-slate-500 hover:text-navy'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-semibold text-sm">
                {showRelated ? 'Hide Event Details' : 'View Related Event'}
              </span>
              <span className={`text-xs text-center leading-snug ${showRelated ? 'text-white/70' : 'text-slate-400'}`}>
                {relatedEvent.title}
              </span>
            </button>
          )}

        </div>
      </div>

      {/* Divider */}
      {html && <hr className="border-slate-100 mb-8" />}

      {/* Content: single column or two column */}
      <div className={`flex gap-10 ${expanded ? 'flex-col md:flex-row items-start' : 'flex-col'}`}>

        {/* Recap content */}
        {html && (
          <div className={expanded ? 'flex-1 min-w-0' : 'w-full'}>
            {expanded && (
              <div className="flex items-center gap-2 mb-5">
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Recap</span>
                <span className="text-navy font-semibold text-sm">{event.title}</span>
              </div>
            )}
            <div className={proseClass} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}

        {/* Related event content */}
        {expanded && relatedHtml && (
          <div className="flex-1 min-w-0 md:border-l md:border-slate-100 md:pl-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">Past Event</span>
              <span className="text-navy font-semibold text-sm">{relatedEvent!.title}</span>
            </div>
            <div className={proseClass} dangerouslySetInnerHTML={{ __html: relatedHtml }} />
          </div>
        )}

      </div>
    </div>
  )
}
