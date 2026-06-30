export default function Loading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-4 w-24 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-white/20 rounded animate-pulse" />
          <div className="h-5 w-96 bg-white/10 rounded mt-4 animate-pulse" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
              <div className="h-3 w-20 bg-slate-200 rounded mb-4" />
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-slate-100 rounded" />
                <div className="h-3 bg-slate-100 rounded" />
                <div className="h-3 w-2/3 bg-slate-100 rounded" />
              </div>
              <div className="h-9 bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
