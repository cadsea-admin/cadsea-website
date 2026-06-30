export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-pulse">
      {/* Back link */}
      <div className="h-4 w-24 bg-slate-200 rounded mb-8" />
      {/* Cover */}
      <div className="w-full aspect-video bg-slate-200 rounded-2xl mb-8" />
      {/* Badge + title */}
      <div className="h-5 w-20 bg-slate-200 rounded-full mb-4" />
      <div className="h-9 w-3/4 bg-slate-200 rounded mb-3" />
      {/* Meta */}
      <div className="space-y-2 mb-8">
        <div className="h-4 w-48 bg-slate-100 rounded" />
        <div className="h-4 w-36 bg-slate-100 rounded" />
      </div>
      {/* Body */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-4 bg-slate-100 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  )
}
