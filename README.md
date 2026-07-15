# CADSEA Website

Official website for the Chinese American Data Science and Engineering Association (CADSEA).

**Live site:** https://www.cadsea.org  
**Admin accounts:** All services are under `cadsea-admin@gmail.com`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| CMS | Notion API |
| Hosting | Vercel |
| Email | Resend |
| Language | TypeScript |

---

## System Architecture

```
Content editors edit Notion
        │
        ▼
  Click publish link
  (https://www.cadsea.org/api/revalidate?secret=SECRET&redirect=URL)
        │
        ▼
  Next.js /api/revalidate
  invalidates cached pages
        │
        ▼
  Next.js fetches fresh data
  from Notion API on next visit
        │
        ▼
  Static HTML served via
  Vercel CDN globally
```

Pages are statically generated with **ISR (Incremental Static Regeneration)**:
- Auto-refresh every **24 hours** (`export const revalidate = 86400`)
- Immediate refresh via the **publish link** (on-demand revalidation)

---

## Project Structure

```
cadsea-website/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (Navbar, Footer)
│   ├── events/
│   │   ├── page.tsx                # Events list (Upcoming / Recap / Past)
│   │   └── [id]/page.tsx           # Event detail page
│   ├── about/
│   │   ├── board/page.tsx          # Board of Directors (static data)
│   │   ├── advisory/page.tsx       # Advisory Committee (static data)
│   │   └── volunteers/page.tsx     # Volunteers + Hall of Fame (Notion data)
│   ├── services/page.tsx           # Services page (static)
│   ├── contact/page.tsx            # Contact form (sends via Resend)
│   ├── api/
│   │   ├── revalidate/route.ts     # On-demand cache revalidation endpoint
│   │   └── contact/route.ts        # Contact form email handler
│   └── components/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── EventsClient.tsx        # Events list with search and year filter
│       ├── RecapDetailClient.tsx   # Recap event detail with related event toggle
│       ├── HallOfFameGrid.tsx      # Hall of Fame photo grid with popup
│       ├── VolunteersTable.tsx     # All volunteers table with popup
│       ├── PosterLightbox.tsx      # Event poster image lightbox
│       └── NotionRenderer.tsx      # Renders Notion block content
├── lib/
│   ├── notion.ts                   # All Notion API calls and types
│   └── volunteerPhotos.ts          # Name → photo filename mapping
└── public/
    └── images/
        ├── board/                  # Board member photos
        ├── advisory/               # Advisory committee photos
        ├── volunteers/             # Volunteer photos
        ├── sponsors/               # Sponsor logos
        └── logo/                   # CADSEA logo
```

---

## Notion Integration

### Databases in Use

#### 1. Events (`NOTION_EVENT_ID`)

| Field | Type | Description |
|---|---|---|
| Title | Title | Event name |
| Date | Text | Display date string (e.g. "September 27, 2025 @ 2:00 pm") |
| Location | Text | Venue name. Defaults to "Online" if empty |
| Address | Text | Street address for maps link |
| Description | Text | Short description shown on cards |
| Price | Text | Ticket price. Defaults to "0" (FREE) if empty |
| Image | Files | Event poster image |
| Status | Select | `Upcoming`, `Past`, or `Recap` |
| RelatedEventUrl | Text | For Recap events: URL of the related Past event in Notion |

Event body content (details, agenda, etc.) is written directly in the **Notion page blocks** and rendered via `notion-to-md`.

**Event Status logic:**
- `Upcoming` — shown in the Upcoming tab
- `Past` — shown in the Past tab
- `Recap` — shown in the Recap tab; hides price/location; shows a "View Related Event" side panel if `RelatedEventUrl` is set

#### 2. EventVolunteers (`NOTION_EVENT_VOLUNTEERS_ID`)

| Field | Type | Description |
|---|---|---|
| Name | Title | Volunteer's name (must match `lib/volunteerPhotos.ts` key for photo) |
| Contribution | Text | Role or contribution description |
| 2025 hall of fame | Text | Enter `yes` to include in Hall of Fame section |

### Notion Integration Setup

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create an integration and copy the **Internal Integration Secret** → this is `NOTION_API_KEY`
3. For each database, open it in Notion → click **"..." menu → Connections** → connect the integration
4. Get the database ID from the URL: `notion.so/{workspace}/{DATABASE_ID}?v=...`

### `lib/notion.ts` Functions

| Function | Returns | Description |
|---|---|---|
| `getEvents(status?)` | `NotionEvent[]` | All events, optionally filtered by status |
| `getEventById(id)` | `NotionEvent \| null` | Single event by Notion page ID |
| `getEventBlocks(id)` | `string` (HTML) | Renders Notion page blocks to HTML via notion-to-md |
| `getVolunteerList()` | `VolunteerInfo[]` | All volunteers from EventVolunteers DB |
| `getPromoters()` | `Promoter[]` | Promoters list (not currently displayed on site) |

### Volunteer Photos (`lib/volunteerPhotos.ts`)

Volunteer photos are stored in `public/images/volunteers/` (not in Notion, to avoid Notion's signed URL expiry). The file `lib/volunteerPhotos.ts` contains a static mapping from volunteer name (lowercase) to photo filename.

**To add a new volunteer photo:**
1. Add the photo file to `public/images/volunteers/`
2. Add an entry to the `photoMap` in `lib/volunteerPhotos.ts`:
   ```ts
   'firstname': 'Filename.jpg',
   'firstname lastname': 'Filename.jpg',
   ```
3. The key must match the volunteer's Notion name (case-insensitive)
4. Commit and push — Vercel deploys automatically

---

## Environment Variables

Configure these in **Vercel Dashboard → Project → Settings → Environment Variables** for production, and in `.env.local` for local development.

| Variable | Description |
|---|---|
| `NOTION_API_KEY` | Notion Internal Integration Secret |
| `NOTION_EVENT_ID` | Notion Database ID for Events |
| `NOTION_EVENT_VOLUNTEERS_ID` | Notion Database ID for EventVolunteers |
| `NOTION_PROMOTERS_ID` | Notion Database ID for Promoters |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `REVALIDATE_SECRET` | Secret token for the `/api/revalidate` endpoint |

**Local `.env.local` template:**
```
NOTION_API_KEY=secret_xxx
NOTION_EVENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_EVENT_VOLUNTEERS_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PROMOTERS_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_API_KEY=re_xxx
REVALIDATE_SECRET=your-secret-here
```

Never commit `.env.local` to git (it is already in `.gitignore`).

---

## Content Update Workflow (for editors)

### Adding or editing an event

1. Open the **Events** database in Notion
2. Create a new page or edit an existing one
3. Fill in Title, Date, Location, Address, Description, Price, Status
4. Upload the event poster to the **Image** field
5. Write event details in the page body (Notion blocks)
6. Click the **publish link** to push changes to the website immediately

### Publish link (on-demand revalidation)

The publish link forces the website to re-fetch data from Notion right away, without waiting for the 24-hour auto-refresh.

**Format:**
```
https://www.cadsea.org/api/revalidate?secret=REVALIDATE_SECRET&redirect=https://www.cadsea.org/events
```

Save this as a bookmark or a Notion button. After clicking, the browser redirects to the events page showing updated content.

### Image upload guidelines

- **Recommended formats:** JPG, PNG, WebP
- **Size limit:** Keep files under 5 MB (Notion's upload limit)
- **Tip:** Compress images before uploading using [squoosh.app](https://squoosh.app)
- Event poster images are served from Notion's CDN (signed URLs that auto-refresh)
- Board / advisory / volunteer photos are stored in `public/images/` in the GitHub repo and must be added via git

### Adding a volunteer to Hall of Fame

1. Open the **EventVolunteers** database in Notion
2. Find the volunteer's row
3. In the `2025 hall of fame` column, type `yes`
4. Click the publish link to update the site

---

## Development

### Prerequisites

- Node.js 18+
- npm

### Local setup

```bash
# 1. Clone the repository
git clone https://github.com/cadsea-admin/cadsea-website.git
cd cadsea-website

# 2. Install dependencies
npm install

# 3. Create local environment file and fill in values
# (get values from Vercel dashboard or ask the admin)
cp .env.local.example .env.local

# 4. Start development server
npm run dev
# Opens at http://localhost:3000
```

### Useful commands

```bash
npm run dev      # Start dev server with hot reload (Turbopack)
npm run build    # Production build — catches TypeScript/lint errors
npm run lint     # Run ESLint
```

---

## Deployment

### Automatic deployment

Every push to the `main` branch on GitHub automatically triggers a Vercel deployment. No manual steps needed.

```
git push origin main  →  Vercel builds (~1 min)  →  Live at cadsea.org
```

### Domain

- **Domain:** `cadsea.org` / `www.cadsea.org`
- **DNS provider:** Google Cloud DNS (under `cadsea-admin@gmail.com`)
- **DNS records:**

| Type | Name | Value |
|---|---|---|
| A | @ | 216.198.79.1 |
| CNAME | www | 87bfdfda054033e5.vercel-dns-017.com |

---

## Accounts

All services are managed under **`cadsea-admin@gmail.com`**.

| Service | URL | Purpose |
|---|---|---|
| Notion | notion.so | Content CMS |
| GitHub | github.com/cadsea-admin/cadsea-website | Source code |
| Vercel | vercel.com | Hosting and deployments |
| Resend | resend.com | Contact form emails (delivered to cadseadc@gmail.com) |
| Google Cloud DNS | console.cloud.google.com | Domain DNS management |

---

## Common Maintenance Tasks

### Adding a new page

1. Create `app/your-page/page.tsx`
2. Add `export const revalidate = 86400` if the page fetches Notion data
3. Add a link in `app/components/Navbar.tsx` and `app/components/Footer.tsx`

### Updating static content (board, advisory, services)

Board and advisory committee data is hardcoded — it is not fetched from Notion:
- `app/about/board/page.tsx` — edit the `members` array
- `app/about/advisory/page.tsx` — edit the `advisors` array

Edit these files directly and push to deploy.

### Adding a new Notion database

1. Create the database in Notion and connect the Integration
2. Copy the database ID from the Notion URL
3. Add it as an environment variable in Vercel and in `.env.local`
4. Add a fetch function in `lib/notion.ts` following the existing pattern

### Upgrading the Notion API client

The client version is pinned in `package.json`. To upgrade:

```bash
npm install @notionhq/client@latest notion-to-md@latest
npm run build   # Verify no breaking changes
```

Check the [Notion API changelog](https://developers.notion.com/changelog) for breaking changes before upgrading.

### If the publish link stops working

1. Verify `REVALIDATE_SECRET` matches in both the link and Vercel environment variables
2. Check function logs: Vercel Dashboard → Project → Deployments → Functions tab
3. Confirm the URL format: `https://www.cadsea.org/api/revalidate?secret=SECRET`

### Data backup

Notion is the source of truth for all dynamic content and has built-in version history (click **"..."** on any page → **Page history**).

Static assets in `public/images/` are version-controlled in the GitHub repository.

To export all Notion content: Notion Settings → Export content → Export all workspace content.
