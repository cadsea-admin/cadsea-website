'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getVolunteerPhoto } from '@/lib/volunteerPhotos'

type Volunteer = {
  id: string
  name: string
  contribution: string
}

function RosetteBadge({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx="11" cy="4.5" rx="2" ry="3" fill="#e8a020" opacity="0.85"
          transform={`rotate(${i * 45} 11 11)`} />
      ))}
      <circle cx="11" cy="11" r="5" fill="#e8a020" />
      <circle cx="11" cy="11" r="3.5" fill="#f5b942" />
      <circle cx="11" cy="11" r="1.5" fill="#0f2a5e" />
    </svg>
  )
}

function nameInitials(name: string) {
  return name.trim().split(/\s+/).map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function VolunteerAvatar({ name, size }: { name: string; size: number }) {
  const photo = getVolunteerPhoto(name)
  const cls = `rounded-full overflow-hidden`
  if (photo) {
    return (
      <div className={cls} style={{ width: size, height: size }}>
        <Image src={`/volunteers/${photo}`} alt={name} width={size} height={size} className="w-full h-full object-cover" />
      </div>
    )
  }
  return (
    <div className={`${cls} bg-gold/20 flex items-center justify-center`} style={{ width: size, height: size }}>
      <span className="text-gold font-bold" style={{ fontSize: size * 0.3 }}>{nameInitials(name)}</span>
    </div>
  )
}

export default function HallOfFameGrid({ volunteers }: { volunteers: Volunteer[] }) {
  const [selected, setSelected] = useState<Volunteer | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {volunteers.map((v) => {
          const photo = getVolunteerPhoto(v.name)
          return (
            <button
              key={v.id}
              onClick={() => setSelected(v)}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-gold/25 hover:border-gold/60 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
            >
              <div className="relative mb-4">
                <div className="ring-2 ring-gold/50 ring-offset-2 ring-offset-navy rounded-full group-hover:ring-gold transition-all duration-200">
                  <VolunteerAvatar name={v.name} size={72} />
                </div>
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-navy border border-gold/30 flex items-center justify-center shadow">
                  <RosetteBadge size={14} />
                </span>
              </div>
              <h3 className="text-white font-bold text-sm leading-snug">{v.name}</h3>
              {v.contribution && (
                <p className="text-white/40 text-xs mt-1 leading-snug">{v.contribution}</p>
              )}
            </button>
          )
        })}
      </div>

      {/* Expand modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Large avatar */}
            <div className="ring-4 ring-gold/40 ring-offset-4 ring-offset-white rounded-full mb-5">
              <VolunteerAvatar name={selected.name} size={200} />
            </div>

            {/* Badge */}
            <div className="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-widest mb-3">
              <RosetteBadge size={16} /> Hall of Fame 2025
            </div>

            {/* Name */}
            <h3 className="text-navy text-2xl font-bold">{selected.name}</h3>

            {/* Contribution */}
            {selected.contribution && (
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">{selected.contribution}</p>
            )}

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="mt-6 px-6 py-2 rounded-full border border-slate-200 text-slate-400 text-sm hover:border-navy hover:text-navy transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
