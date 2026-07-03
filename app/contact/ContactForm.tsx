'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-navy font-bold text-xl mb-2">Message Sent!</h3>
        <p className="text-slate-500 text-sm">We&apos;ll get back to you as soon as we can.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-navy underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Email Address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">Subject</label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => set('subject', e.target.value)}
          placeholder="What is this regarding?"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">Message</label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Tell us how we can help..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-lg bg-navy text-white font-semibold tracking-wide hover:bg-navy-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'SUBMIT'}
      </button>
    </form>
  )
}
