import type { ReactNode } from 'react'

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g

/** Renders the tiny inline-markdown subset used by the course content. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  const out: ReactNode[] = parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="rounded-md border border-line bg-canvas px-1.5 py-0.5 font-mono text-[0.86em] text-ink-soft">{part.slice(1, -1)}</code>
    if (part.startsWith('[')) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
      if (m) {
        const external = /^https?:/.test(m[2])
        return <a key={i} href={m[2]} className="dotted-link" {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{m[1]}</a>
      }
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
  return <>{out}</>
}
