import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

function checkSecret(request: NextRequest): boolean {
  const secret = request.nextUrl.searchParams.get('secret')
  return !!secret && secret === process.env.REVALIDATE_SECRET
}

function doRevalidate() {
  revalidatePath('/events', 'layout')
  revalidatePath('/about/volunteers')
}

// Browser access
export async function GET(request: NextRequest) {
  if (!checkSecret(request)) {
    return new Response(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
        <h1 style="color:#dc2626">❌ 无权访问</h1>
      </body></html>`,
      { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  }

  doRevalidate()

  const redirect = request.nextUrl.searchParams.get('redirect')
  if (redirect) {
    return Response.redirect(redirect)
  }

  const time = new Date().toLocaleString('zh-CN', { timeZone: 'America/New_York' })

  return new Response(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;gap:12px">
      <h1 style="font-size:2.5rem;margin:0">✅ 网站内容已更新</h1>
      <p style="color:#64748b;margin:0">${time} (ET)</p>
    </body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// Notion button webhook
export async function POST(request: NextRequest) {
  if (!checkSecret(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  doRevalidate()

  return Response.json({ revalidated: true })
}
