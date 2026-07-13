'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getVolunteerPhoto } from '@/lib/volunteerPhotos'

type Volunteer = {
  id: string
  name: string
  contribution: string
  hallOfFame: boolean
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
  return name.trim()[0]?.toUpperCase() ?? '?'
}

function VolunteerAvatar({ name, size }: { name: string; size: number }) {
  const photo = getVolunteerPhoto(name)
  if (photo) {
    return (
      <div className="rounded-full overflow-hidden shrink-0 border-2 border-slate-200" style={{ width: size, height: size }}>
        <Image src={`/images/volunteers/${photo}`} alt={name} width={size} height={size} className="w-full h-full object-cover" />
      </div>
    )
  }
  return (
    <div className="rounded-full bg-navy flex items-center justify-center shrink-0 border-2 border-slate-200" style={{ width: size, height: size }}>
      <span className="text-white font-bold" style={{ fontSize: size * 0.3 }}>{nameInitials(name)}</span>
    </div>
  )
}

export default function VolunteersTable({ volunteers }: { volunteers: Volunteer[] }) {
  const [selected, setSelected] = useState<Volunteer | null>(null)

  const hallOfFame = volunteers.filter((v) => v.hallOfFame)
  const others     = volunteers.filter((v) => !v.hallOfFame)

  return (
    <>
      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white text-left">
              <th className="px-5 py-4 font-semibold">Volunteer</th>
              <th className="px-5 py-4 font-semibold">Contribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...hallOfFame, ...others].map((v) => (
              <tr
                key={v.id}
                onClick={() => setSelected(v)}
                className={`transition-colors cursor-pointer ${v.hallOfFame ? 'bg-amber-50/40 hover:bg-amber-50/80' : 'bg-white hover:bg-slate-50'}`}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <VolunteerAvatar name={v.name} size={40} />
                    <span className="font-semibold text-navy">{v.name}</span>
                    {v.hallOfFame && <RosetteBadge size={14} />}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500 text-xs">{v.contribution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expand popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.hallOfFame ? (
              <>
                <div className="ring-4 ring-gold/40 ring-offset-4 ring-offset-white rounded-full mb-5">
                  <VolunteerAvatar name={selected.name} size={200} />
                </div>
                <div className="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                  <RosetteBadge size={16} /> Hall of Fame 2025
                </div>
              </>
            ) : (
              <div className="ring-4 ring-slate-100 ring-offset-4 ring-offset-white rounded-full mb-5">
                <VolunteerAvatar name={selected.name} size={200} />
              </div>
            )}

            <h3 className="text-navy text-2xl font-bold">{selected.name}</h3>
            {selected.contribution && (
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">{selected.contribution}</p>
            )}
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
