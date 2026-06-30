import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// ── Types ──────────────────────────────────────────────────────────────────

export type NotionEvent = {
  id: string
  title: string
  date: string | null
  dateEnd: string | null
  summary: string
  location: string
  category: string
  status: string
  registrationUrl: string
  coverImage: string
}

export type { BlockObjectResponse, RichTextItemResponse }

// ── Property extractors ────────────────────────────────────────────────────

function extractText(prop: PageObjectResponse['properties'][string] | undefined): string {
  if (!prop) return ''
  if (prop.type === 'title') return prop.title.map((t) => t.plain_text).join('')
  if (prop.type === 'rich_text') return prop.rich_text.map((t) => t.plain_text).join('')
  if (prop.type === 'url') return prop.url ?? ''
  if (prop.type === 'select') return prop.select?.name ?? ''
  return ''
}

function extractDate(prop: PageObjectResponse['properties'][string] | undefined): string | null {
  if (!prop || prop.type !== 'date') return null
  return prop.date?.start ?? null
}

function extractDateEnd(prop: PageObjectResponse['properties'][string] | undefined): string | null {
  if (!prop || prop.type !== 'date') return null
  return prop.date?.end ?? null
}

function extractCover(page: PageObjectResponse): string {
  // First: check Cover Image URL property
  const prop = page.properties['Cover Image']
  if (prop?.type === 'url' && prop.url) return prop.url
  if (prop?.type === 'rich_text' && prop.rich_text[0]?.plain_text) {
    return prop.rich_text[0].plain_text
  }
  // Fallback: Notion page cover
  if (page.cover?.type === 'external') return page.cover.external.url
  if (page.cover?.type === 'file') return page.cover.file.url
  return ''
}

function mapPage(page: PageObjectResponse): NotionEvent {
  return {
    id: page.id,
    title: extractText(page.properties['Title']),
    date: extractDate(page.properties['Date']),
    dateEnd: extractDateEnd(page.properties['Date']),
    summary: extractText(page.properties['Summary'] ?? page.properties['Description']),
    location: extractText(page.properties['Location']),
    category: extractText(page.properties['Category']),
    status: extractText(page.properties['Status']),
    registrationUrl: extractText(page.properties['Registration URL'] ?? page.properties['URL']),
    coverImage: extractCover(page),
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

export async function getEvents(): Promise<NotionEvent[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    // TODO: add Status field to Notion database, then uncomment:
    // filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'Date', direction: 'ascending' }],
  })

  return (response.results as PageObjectResponse[]).map(mapPage)
}

export async function getEventById(id: string): Promise<NotionEvent | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id }) as PageObjectResponse
    return mapPage(page)
  } catch {
    return null
  }
}

export async function getEventBlocks(id: string): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({
    block_id: id,
    page_size: 100,
  })
  return response.results as BlockObjectResponse[]
}

export default notion
