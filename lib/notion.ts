import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export type { RichTextItemResponse }
export type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

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

function extractFile(prop: PageObjectResponse['properties'][string] | undefined): string {
  if (!prop || prop.type !== 'files') return ''
  const file = prop.files[0]
  if (!file) return ''
  if (file.type === 'file') return file.file.url
  if (file.type === 'external') return file.external.url
  return ''
}

function extractStatus(prop: PageObjectResponse['properties'][string] | undefined): string {
  if (!prop) return ''
  if (prop.type === 'select') return prop.select?.name ?? ''
  if (prop.type === 'status') return prop.status?.name ?? ''
  if (prop.type === 'rich_text') return prop.rich_text.map((t) => t.plain_text).join('')
  return ''
}

// ── Events ─────────────────────────────────────────────────────────────────

export type NotionEvent = {
  id: string
  title: string
  date: string
  location: string
  address: string
  description: string
  registerLink: string
  poster: string
  status: 'Upcoming' | 'Past' | 'Recap' | string
}

function mapEvent(page: PageObjectResponse): NotionEvent {
  return {
    id: page.id,
    title: extractText(page.properties['Title']),
    date: extractText(page.properties['Date']),
    location: extractText(page.properties['Location']),
    address: extractText(page.properties['Address']),
    description: extractText(page.properties['Description']),
    registerLink: extractText(page.properties['RegisterLink']),
    poster: extractFile(page.properties['Poster']),
    status: extractStatus(page.properties['Status']),
  }
}

export async function getEvents(status?: 'Upcoming' | 'Past' | 'Recap'): Promise<NotionEvent[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_EVENT_ID!,
  })
  const events = (response.results as PageObjectResponse[]).map(mapEvent)
  if (!status) return events
  return events.filter((e) => e.status === status)
}

export async function getEventById(id: string): Promise<NotionEvent | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id }) as PageObjectResponse
    return mapEvent(page)
  } catch {
    return null
  }
}

export async function getEventBlocks(id: string): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const n2m = new NotionToMarkdown({ notionClient: notion as any })
    const mdBlocks = await n2m.pageToMarkdown(id)
    const { parent } = n2m.toMarkdownString(mdBlocks)
    return parent
  } catch {
    return ''
  }
}

// ── Promoters ──────────────────────────────────────────────────────────────

export type Promoter = {
  id: string
  name: string
  task: string
  count: string
}

export async function getPromoters(): Promise<Promoter[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROMOTERS_ID!,
    sorts: [{ property: 'Name', direction: 'ascending' }],
  })
  return (response.results as PageObjectResponse[]).map((page) => ({
    id: page.id,
    name: extractText(page.properties['Name']),
    task: extractText(page.properties['Task']),
    count: extractText(page.properties['Count']),
  }))
}

// ── Event Volunteers ───────────────────────────────────────────────────────

export type EventVolunteer = {
  id: string
  name: string
  eventName: string
  date: string | null
}

export async function getEventVolunteers(): Promise<EventVolunteer[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_EVENT_VOLUNTEERS_ID!,
    sorts: [{ property: 'Date', direction: 'descending' }],
  })
  return (response.results as PageObjectResponse[]).map((page) => ({
    id: page.id,
    name: extractText(page.properties['Name']),
    eventName: extractText(page.properties['EventName']),
    date: extractDate(page.properties['Date']),
  }))
}

export default notion
