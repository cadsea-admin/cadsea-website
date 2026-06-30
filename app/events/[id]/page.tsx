import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEventById, getEventBlocks } from '@/lib/notion'
import NotionRenderer from '@/app/components/NotionRenderer'

export async function generateMetadata(
  props: PageProps<'/events/[id]'>
): Promise<Metadata> {
  const { id } = await props.params
  const event = await getEventById(id)
  if (!event) return {}
  return {
    title: event.title,
    description: event.summary,
    openGraph: event.coverImage ? { images: [event.coverImage] } : undefined,
  }
}

function formatDateTime(start: string | null, end: string | null): string {
  if (!start) return 'TBD'
  const s = new Date(start)
  const opts: Intl.DateTimeFormatOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }
  let label = s.toLocaleDateString('en-US', opts)
  // append time if the date string includes time component
  if (start.includes('T')) {
    label += ' · ' + s.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  if (end) {
    const e = new Date(end)
    if (end.includes('T')) {
      label += ' – ' + e.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
  }
  return label
}

const categoryColor: Record<string, string> = {
  Networking: 'bg-blue-50 text-blue-700',
  Workshop:   'bg-purple-50 text-purple-700',
  Panel:      'bg-rose-50 text-rose-700',
  Career:     'bg-green-50 text-green-700',
}

export default async function EventDetailPage(props: PageProps<'/events/[id]'>) {
  const { id } = await props.params
  const [event, blocks] = await Promise.all([
    getEventById(id),
    getEventBlocks(id),
  ])

  if (!event) notFound()

  const isUpcoming = event.date ? new Date(event.date) >= new Date(new Date().toDateString()) : true
  const badgeClass = categoryColor[event.category] ?? 'bg-slate-100 text-slate-600'

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Back */}
      <Link href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-navy transition-colors mb-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Events
      </Link>

      {/* Cover image */}
      {event.coverImage && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-8">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Category badge */}
      {event.category && (
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${badgeClass}`}>
          {event.category}
        </span>
      )}

      {/* Title */}
      <h1 className="text-navy text-3xl md:text-4xl font-bold leading-tight mb-5">
        {event.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-col gap-2 mb-8 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-2 text-muted text-sm">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDateTime(event.date, event.dateEnd)}</span>
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        )}

        {/* Registration CTA */}
        {event.registrationUrl && isUpcoming && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors w-fit shadow"
          >
            Register Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      {/* Notion page body */}
      {blocks.length > 0 && <NotionRenderer blocks={blocks} />}
    </article>
  )
}
