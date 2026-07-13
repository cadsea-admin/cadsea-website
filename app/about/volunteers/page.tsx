import type { Metadata } from 'next'
import { getVolunteerList } from '@/lib/notion'
import HallOfFameGrid from '@/app/components/HallOfFameGrid'
import VolunteersTable from '@/app/components/VolunteersTable'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Volunteers',
  description: 'Meet the CADSEA volunteers who help promote our events and support our community.',
}

export default async function VolunteersPage() {
  const volunteers = await getVolunteerList()
  const hallOfFame = volunteers.filter((v) => v.hallOfFame)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden py-20 px-6">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="text-white text-4xl md:text-5xl font-bold mt-2 mb-4 leading-tight">Volunteers</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            CADSEA is powered by dedicated volunteers who promote our events and strengthen our community.
            Thank you to everyone who contributes their time and energy.
          </p>
        </div>
      </section>

      {/* Hall of Fame 2025 */}
      {hallOfFame.length > 0 && (
        <section className="py-20 px-6 bg-navy relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              {/* Trophy icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border border-gold/30 mb-5">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                </svg>
              </div>
              <h2 className="text-white text-4xl md:text-5xl font-bold">Hall of Fame</h2>
              <p className="text-gold text-lg font-semibold tracking-widest mt-1">2025</p>
              <p className="text-white/50 text-sm mt-3 max-w-md mx-auto">
                Outstanding volunteers who went above and beyond for CADSEA this year.
              </p>
            </div>

            {/* Cards — client component handles click-to-zoom */}
            <HallOfFameGrid volunteers={hallOfFame} />
          </div>
        </section>
      )}

      {/* All Volunteers Table */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Team</span>
            <h2 className="text-navy text-2xl font-bold mt-1">All Volunteers 2025</h2>
            <p className="text-slate-500 text-sm mt-1">Click any row to learn more.</p>
          </div>
          <VolunteersTable volunteers={volunteers} />
        </div>
      </section>
    </>
  )
}
