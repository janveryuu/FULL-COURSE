import type { Project } from '../content/types'
import { BlockView, CopyButton } from './Blocks'
import { Inline } from './Inline'
import { Icon } from './Icon'
import { Bot, Brain, Puzzle, Check } from 'lucide-react'

const H = ({ children }: { children: string }) => (
  <h2 id={children.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="mt-12 mb-3 scroll-mt-24 text-[22px] font-medium tracking-tight text-ink">{children}</h2>
)

export function ProjectMeta({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap gap-2 text-[12.5px]">
      <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-ink-soft"><Icon name={p.icon} className="size-3.5 text-brand-deep" />{p.category}</span>
      <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-ink-soft">{p.difficulty}</span>
      <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-ink-soft">⏱ {p.time}</span>
    </div>
  )
}

export function ProjectView({ p }: { p: Project }) {
  return (
    <div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">You will learn</p>
          <ul className="mt-2 space-y-1.5">
            {p.learn.map((l) => <li key={l} className="flex gap-2 text-[14px] text-ink-soft"><Check className="mt-0.5 size-4 shrink-0 text-brand-deep" /> <Inline text={l} /></li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Features (v1)</p>
          <ul className="mt-2 space-y-1.5">
            {p.features.map((l) => <li key={l} className="flex gap-2 text-[14px] text-ink-soft"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/70" /> <Inline text={l} /></li>)}
          </ul>
        </div>
      </div>

      <H>Tech stack</H>
      <BlockView b={{ type: 'table', headers: ['Layer', 'Choice', 'Why'], rows: p.stack.map((s) => [s.layer, `**${s.choice}**`, s.why]) }} />

      <H>Best AI setup</H>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-line bg-brand-soft/60 p-4">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-brand-deep"><Brain className="size-3.5" />Model</p>
          <p className="mt-1.5 font-medium">{p.model.pick}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-ink-soft"><Inline text={p.model.why} /></p>
          <p className="mt-2 text-[13px] text-muted"><span className="font-medium text-ink-soft">Alternative: </span><Inline text={p.model.alt} /></p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted"><Bot className="size-3.5" />Harness</p>
          <p className="mt-1.5 font-medium">{p.harness.pick}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-ink-soft"><Inline text={p.harness.why} /></p>
        </div>
      </div>

      <H>Skills to install</H>
      <div className="grid gap-2">
        {p.skills.map((s) => (
          <div key={s.name} className="flex gap-3 rounded-xl border border-line bg-surface p-3.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-canvas text-ink-soft"><Puzzle className="size-3.5" /></span>
            <div>
              <p className="font-mono text-[13.5px] font-medium text-ink">{s.name}</p>
              <p className="text-[14px] leading-relaxed text-muted"><Inline text={s.why} /></p>
            </div>
          </div>
        ))}
      </div>

      <H>Master prompt</H>
      <p className="text-[15px] leading-relaxed text-ink-soft">Start a fresh session in an empty folder, turn on plan mode, and paste this. Read the plan before you approve it.</p>
      <BlockView b={{ type: 'prompt', label: 'Master prompt · paste first', text: p.masterPrompt }} />

      <H>Build steps</H>
      <p className="text-[15px] leading-relaxed text-ink-soft">After the first version works, send these one at a time. Test in the browser (or your phone) and commit with Git after each step.</p>
      <ol className="mt-4 space-y-3">
        {p.buildSteps.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-line bg-surface">
            <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
              <span className="flex items-center gap-2.5 text-[14px] font-medium">
                <span className="grid size-6 place-items-center rounded-full bg-brand-soft font-mono text-[11px] text-brand-deep">{i + 1}</span>
                {s.title}
              </span>
              <CopyButton text={s.prompt} />
            </div>
            <p className="whitespace-pre-wrap p-4 font-mono text-[12.5px] leading-relaxed text-ink-soft">{s.prompt}</p>
          </li>
        ))}
      </ol>

      <H>Common pitfalls</H>
      <BlockView b={{ type: 'list', items: p.pitfalls }} />

      <H>Level it up</H>
      <BlockView b={{ type: 'list', items: p.stretch }} />
    </div>
  )
}
