import type { Metadata } from 'next'
import { getEvents } from '@/lib/notion'
import EventsClient from '@/app/components/EventsClient'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events hosted by CADSEA.',
}

export default async function EventsPage() {
  const [upcoming, past, recap] = await Promise.all([
    getEvents('Upcoming'),
    getEvents('Past'),
    getEvents('Recap'),
  ])

  return (
    <>
      <section className="relative bg-navy overflow-hidden py-20 px-6">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="relative max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Community</span>
          <h1 className="text-white text-4xl md:text-5xl font-bold mt-2 mb-3">Events</h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Join us for forums, workshops, and networking events designed to advance your career and connect you with the data science community.
          </p>
        </div>
      </section>

      <EventsClient upcoming={upcoming} recap={recap} past={past} />
    </>
  )
}
