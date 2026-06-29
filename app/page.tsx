import { getEvents } from '@/lib/notion'

export default async function Home() {
  const events = await getEvents()

  return (
    <main>
      <h1>CADSEA Events</h1>
      {events.map((event: any) => (
        <div key={event.id}>
          <h2>{event.properties.Title.title[0]?.plain_text}</h2>
          <p>{event.properties.Date.rich_text[0]?.plain_text}</p>
          <p>{event.properties.Description.rich_text[0]?.plain_text}</p>
        </div>
      ))}
    </main>
  )
}