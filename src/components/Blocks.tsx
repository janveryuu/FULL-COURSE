import { useState } from 'react'
import { Check, Copy, Lightbulb, Info, TriangleExclamationPoint, Sparkles, KeyRound, X, CircleCheck } from 'lucide-react'
import type { Block } from '../content/types'
import { Inline } from './Inline'
import { BrandBadge, Icon } from './Icon'
import { Diagram } from './Diagrams'

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch { /* clipboard blocked */ }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 text-[12px] font-medium text-ink-soft transition hover:border-line-strong hover:text-ink active:scale-95"
    >
      {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  )
}

const tones = {
  tip: { box: 'border-emerald-200 bg-emerald-50/70', icon: Lightbulb, ic: 'text-emerald-600', title: 'Tip' },
  info: { box: 'border-brand-line bg-brand-soft/70', icon: Info, ic: 'text-brand-deep', title: 'Good to know' },
  warn: { box: 'border-amber-200 bg-amber-50/80', icon: TriangleExclamationPoint, ic: 'text-amber-600', title: 'Watch out' },
  analogy: { box: 'border-sky-200 bg-sky-50/70', icon: Sparkles, ic: 'text-sky-600', title: 'Simple analogy' },
  key: { box: 'border-ink bg-ink text-white', icon: KeyRound, ic: 'text-amber-300', title: 'Key idea' },
}

function Quiz({ b }: { b: Extract<Block, { type: 'quiz' }> }) {
  const [picked, setPicked] = useState<number | null>(null)
  const right = picked === b.answer
  return (
    <div className="my-7 rounded-2xl border border-line bg-surface p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-brand-deep">Quick check</p>
      <p className="mt-1.5 font-medium text-ink">{b.question}</p>
      <div className="mt-3 grid gap-2">
        {b.options.map((o, i) => {
          const state = picked === null ? 'idle' : i === b.answer ? 'right' : i === picked ? 'wrong' : 'dim'
          return (
            <button
              key={o}
              type="button"
              disabled={picked !== null}
              onClick={() => setPicked(i)}
              className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-[14.5px] transition ${
                state === 'idle' ? 'border-line hover:border-brand-line hover:bg-brand-soft/40' :
                state === 'right' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' :
                state === 'wrong' ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-line opacity-55'
              }`}
            >
              <span className={`grid size-5 shrink-0 place-items-center rounded-full border text-[11px] ${state === 'right' ? 'border-emerald-500 bg-emerald-500 text-white' : state === 'wrong' ? 'border-rose-400 bg-rose-400 text-white' : 'border-line-strong text-muted'}`}>
                {state === 'right' ? <Check className="size-3" /> : state === 'wrong' ? <X className="size-3" /> : String.fromCharCode(65 + i)}
              </span>
              {o}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="mt-3 rounded-xl bg-canvas p-3.5 text-[14px] leading-relaxed text-ink-soft">
          <span className={`font-semibold ${right ? 'text-emerald-700' : 'text-rose-700'}`}>{right ? 'Correct! ' : 'Not quite. '}</span>
          <Inline text={b.explain} />
          {!right && (
            <button type="button" onClick={() => setPicked(null)} className="ml-2 text-brand-deep underline underline-offset-2">Try again</button>
          )}
        </div>
      )}
    </div>
  )
}

export function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case 'p':
      return <p className="my-4 text-[16.5px] leading-[1.75] text-ink-soft"><Inline text={b.text} /></p>
    case 'h2':
      return <h2 id={slugify(b.text)} className="mt-12 mb-3 scroll-mt-24 text-[22px] font-medium tracking-tight text-ink">{b.text}</h2>
    case 'h3':
      return <h3 className="mt-8 mb-2 text-[17px] font-semibold tracking-tight text-ink">{b.text}</h3>
    case 'list': {
      const L = b.ordered ? 'ol' : 'ul'
      return (
        <L className={`my-4 space-y-2 pl-1 text-[16px] leading-[1.7] text-ink-soft ${b.ordered ? 'list-none [counter-reset:li]' : ''}`}>
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              {b.ordered
                ? <span className="mt-[3px] grid size-[22px] shrink-0 place-items-center rounded-full bg-brand-soft font-mono text-[11px] font-medium text-brand-deep">{i + 1}</span>
                : <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand/70" />}
              <span><Inline text={it} /></span>
            </li>
          ))}
        </L>
      )
    }
    case 'callout': {
      const t = tones[b.tone]
      const I = t.icon
      return (
        <div className={`my-6 flex gap-3 rounded-2xl border p-4 ${t.box}`}>
          <I className={`mt-0.5 size-[18px] shrink-0 ${t.ic}`} strokeWidth={2} />
          <div className={`text-[15px] leading-relaxed ${b.tone === 'key' ? 'text-white/85' : 'text-ink-soft'}`}>
            <p className={`mb-0.5 font-semibold ${b.tone === 'key' ? 'text-white' : 'text-ink'}`}>{b.title ?? t.title}</p>
            <Inline text={b.text} />
          </div>
        </div>
      )
    }
    case 'cards':
      return (
        <div className={`my-6 grid gap-3 ${b.columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {b.items.map((c) => (
            <div key={c.title} className="rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-[0_2px_12px_-6px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[13px] text-muted">
                  {c.brand ? <BrandBadge brand={c.brand} className="size-5 text-[11px]" /> : c.icon ? <span className="grid size-6 place-items-center rounded-md bg-brand-soft text-brand-deep"><Icon name={c.icon} className="size-3.5" /></span> : null}
                  {c.eyebrow}
                </div>
                {c.tag && <span className="rounded-full border border-line bg-canvas px-2 py-0.5 text-[11px] text-muted">{c.tag}</span>}
              </div>
              <p className="mt-2 text-[16px] font-medium text-ink">{c.title}</p>
              {c.text && <p className="mt-1 text-[14px] leading-relaxed text-muted"><Inline text={c.text} /></p>}
            </div>
          ))}
        </div>
      )
    case 'table':
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-line bg-surface scrollbar-thin">
          <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-line bg-canvas/70">
                {b.headers.map((h) => <th key={h} className="px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-line last:border-0 align-top">
                  {r.map((c, j) => <td key={j} className={`px-4 py-3 leading-relaxed ${j === 0 ? 'font-medium text-ink' : 'text-ink-soft'}`}><Inline text={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'code':
      return (
        <div className="my-6 overflow-hidden rounded-2xl border border-[#2a2a30] bg-[#16161A]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <span className="flex items-center gap-2 font-mono text-[11px] text-white/50">
              <span className="flex gap-1"><i className="size-2 rounded-full bg-white/15" /><i className="size-2 rounded-full bg-white/15" /><i className="size-2 rounded-full bg-white/15" /></span>
              {b.label ?? b.lang ?? 'terminal'}
            </span>
            <CopyButton text={b.code} />
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#E7E7EA] scrollbar-thin"><code>{b.code}</code></pre>
        </div>
      )
    case 'prompt':
      return (
        <div className="my-6 rounded-2xl border border-line bg-surface">
          <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
            <span className="flex items-center gap-2 text-[13px] font-medium text-ink-soft">
              <span className="grid size-5 place-items-center rounded-md bg-brand text-white"><Sparkles className="size-3" /></span>
              {b.label ?? 'Prompt'}
            </span>
            <CopyButton text={b.text} label="Copy prompt" />
          </div>
          <p className="whitespace-pre-wrap p-4 font-mono text-[13px] leading-relaxed text-ink-soft">{b.text}</p>
        </div>
      )
    case 'compare':
      return (
        <div className="my-6 grid gap-3 md:grid-cols-2">
          {([['bad', b.bad], ['good', b.good]] as const).map(([k, side]) => (
            <div key={k} className={`flex flex-col rounded-2xl border p-4 ${k === 'bad' ? 'border-rose-200 bg-rose-50/50' : 'border-emerald-200 bg-emerald-50/50'}`}>
              <p className={`flex items-center gap-1.5 text-[13px] font-semibold ${k === 'bad' ? 'text-rose-700' : 'text-emerald-700'}`}>
                {k === 'bad' ? <X className="size-4" /> : <CircleCheck className="size-4" />}
                {side.title ?? (k === 'bad' ? 'Weak' : 'Strong')}
              </p>
              <p className="mt-2 flex-1 whitespace-pre-wrap rounded-xl bg-surface/80 p-3 font-mono text-[12.5px] leading-relaxed text-ink-soft">{side.text}</p>
              {side.note && <p className="mt-2 text-[13px] leading-relaxed text-muted"><Inline text={side.note} /></p>}
            </div>
          ))}
        </div>
      )
    case 'steps':
      return (
        <ol className="my-6 space-y-0">
          {b.items.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
              {i < b.items.length - 1 && <span className="absolute top-8 left-[15px] h-[calc(100%-32px)] w-px bg-line-strong" />}
              <span className="z-10 grid size-8 shrink-0 place-items-center rounded-full border border-brand-line bg-brand-soft font-mono text-[13px] font-medium text-brand-deep">{i + 1}</span>
              <div className="pt-1">
                <p className="font-medium text-ink">{s.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft"><Inline text={s.text} /></p>
              </div>
            </li>
          ))}
        </ol>
      )
    case 'quiz':
      return <Quiz b={b} />
    case 'diagram':
      return <Diagram name={b.name} />
    case 'keypoints':
      return (
        <div className="my-8 rounded-2xl border border-brand-line bg-brand-soft/60 p-5">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand-deep">{b.title ?? 'Remember this'}</p>
          <ul className="mt-3 space-y-2">
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
                <Check className="mt-1 size-4 shrink-0 text-brand-deep" strokeWidth={2.5} />
                <span><Inline text={it} /></span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'terms':
      return (
        <dl className="my-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {b.items.map((t) => (
            <div key={t.term} className="grid gap-1 p-4 sm:grid-cols-[170px_1fr] sm:gap-4">
              <dt className="font-medium text-ink">{t.term}</dt>
              <dd className="text-[15px] leading-relaxed text-ink-soft"><Inline text={t.def} /></dd>
            </div>
          ))}
        </dl>
      )
    case 'divider':
      return <hr className="my-10 border-line" />
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b, i) => <BlockView key={i} b={b} />)}</>
}
