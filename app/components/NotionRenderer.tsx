import Image from 'next/image'
import type { BlockObjectResponse, RichTextItemResponse } from '@/lib/notion'

// ── Rich text with annotations ─────────────────────────────────────────────

function RichText({ items }: { items: RichTextItemResponse[] }) {
  return (
    <>
      {items.map((item, i) => {
        const { bold, italic, strikethrough, underline, code } = item.annotations
        let node: React.ReactNode = item.plain_text

        if (code) node = <code className="px-1.5 py-0.5 rounded bg-slate-100 text-sm font-mono text-rose-600">{node}</code>
        if (bold) node = <strong className="font-semibold">{node}</strong>
        if (italic) node = <em>{node}</em>
        if (strikethrough) node = <s>{node}</s>
        if (underline) node = <u>{node}</u>

        if (item.href) {
          node = (
            <a href={item.href} target="_blank" rel="noopener noreferrer"
              className="text-navy underline underline-offset-2 hover:text-navy-light">
              {node}
            </a>
          )
        }

        return <span key={i}>{node}</span>
      })}
    </>
  )
}

// ── Individual block renderers ─────────────────────────────────────────────

function Block({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-slate-700 leading-relaxed">
          <RichText items={block.paragraph.rich_text} />
        </p>
      )

    case 'heading_1':
      return (
        <h2 className="text-navy text-2xl font-bold mt-8 mb-3">
          <RichText items={block.heading_1.rich_text} />
        </h2>
      )

    case 'heading_2':
      return (
        <h3 className="text-navy text-xl font-bold mt-6 mb-2">
          <RichText items={block.heading_2.rich_text} />
        </h3>
      )

    case 'heading_3':
      return (
        <h4 className="text-navy text-base font-semibold mt-4 mb-1">
          <RichText items={block.heading_3.rich_text} />
        </h4>
      )

    case 'bulleted_list_item':
      return (
        <li className="text-slate-700 leading-relaxed ml-4 list-disc">
          <RichText items={block.bulleted_list_item.rich_text} />
        </li>
      )

    case 'numbered_list_item':
      return (
        <li className="text-slate-700 leading-relaxed ml-4 list-decimal">
          <RichText items={block.numbered_list_item.rich_text} />
        </li>
      )

    case 'quote':
      return (
        <blockquote className="border-l-4 border-gold pl-4 italic text-muted">
          <RichText items={block.quote.rich_text} />
        </blockquote>
      )

    case 'callout': {
      const emoji = block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : '💡'
      return (
        <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <span className="text-xl shrink-0">{emoji}</span>
          <p className="text-slate-700 leading-relaxed">
            <RichText items={block.callout.rich_text} />
          </p>
        </div>
      )
    }

    case 'divider':
      return <hr className="border-slate-200" />

    case 'image': {
      const url = block.image.type === 'external'
        ? block.image.external.url
        : block.image.file.url
      const caption = block.image.caption?.map((t) => t.plain_text).join('') ?? ''
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100">
            <Image src={url} alt={caption || 'Event image'} fill className="object-cover" />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-muted mt-2">{caption}</figcaption>
          )}
        </figure>
      )
    }

    case 'code':
      return (
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm font-mono">
          <code>{block.code.rich_text.map((t) => t.plain_text).join('')}</code>
        </pre>
      )

    case 'to_do':
      return (
        <label className="flex items-start gap-3 text-slate-700">
          <input type="checkbox" defaultChecked={block.to_do.checked} disabled
            className="mt-1 accent-navy" />
          <span className={block.to_do.checked ? 'line-through text-muted' : ''}>
            <RichText items={block.to_do.rich_text} />
          </span>
        </label>
      )

    default:
      return null
  }
}

// ── Main renderer ──────────────────────────────────────────────────────────

export default function NotionRenderer({ blocks }: { blocks: BlockObjectResponse[] }) {
  const elements: React.ReactNode[] = []
  let listBuffer: React.ReactNode[] = []
  let listType: 'ul' | 'ol' | null = null

  function flushList() {
    if (listBuffer.length === 0) return
    const Tag = listType === 'ul' ? 'ul' : 'ol'
    elements.push(
      <Tag key={elements.length} className="space-y-1 my-2">
        {listBuffer}
      </Tag>
    )
    listBuffer = []
    listType = null
  }

  blocks.forEach((block, i) => {
    const isBullet = block.type === 'bulleted_list_item'
    const isNumbered = block.type === 'numbered_list_item'

    if (isBullet || isNumbered) {
      const needed: 'ul' | 'ol' = isBullet ? 'ul' : 'ol'
      if (listType && listType !== needed) flushList()
      listType = needed
      listBuffer.push(<Block key={i} block={block} />)
    } else {
      flushList()
      elements.push(<Block key={i} block={block} />)
    }
  })

  flushList()

  return (
    <div className="space-y-4 text-base">
      {elements}
    </div>
  )
}
