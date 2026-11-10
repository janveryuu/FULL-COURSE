import { ArrowRight, ArrowDown } from 'lucide-react'
import type { Block } from '../content/types'
import { BrandBadge, Icon } from './Icon'
import type { ReactNode } from 'react'

type Name = Extract<Block, { type: 'diagram' }>['name']

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="my-7">
      {children}
      <figcaption className="mt-3 text-[13px] leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  )
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted">{children}</p>
)

function Harness() {
  const desks = [
    { name: 'Claude Code', brand: 'claude-code' as const, model: 'Claude', mb: 'claude' as const },
    { name: 'Codex', brand: 'codex' as const, model: 'GPT', mb: 'openai' as const },
    { name: 'Antigravity', brand: 'antigravity' as const, model: 'Gemini', mb: 'gemini' as const },
    { name: 'OpenCode', brand: 'opencode' as const, model: 'Any model via API key', mb: 'generic' as const },
  ]
  return (
    <Frame caption="The model is the worker. The AI harness is the desk it sits at, with its tools (read files, run commands, edit code). A workflow harness is the office that lets you run several desks at once.">
      <div className="rounded-2xl border border-dashed border-line-strong bg-canvas/60 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Label>Workflow harness · the office</Label>
            <p className="mt-1 text-[13px] text-ink-soft">Runs many desks at once: worktrees, sessions, pull requests</p>
          </div>
          <div className="flex gap-1">
            {(['cursor', 'github', 'vercel'] as const).map((b) => <BrandBadge key={b} brand={b} className="size-5 text-[10px]" />)}
          </div>
        </div>
        <div className="mt-4"><Label>AI harness · the desk and tools</Label></div>
        <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {desks.map((d) => (
            <div key={d.name} className="rounded-xl border border-line bg-surface p-3">
              <div className="flex items-center gap-2 text-sm font-medium"><BrandBadge brand={d.brand} className="size-5 text-[11px]" />{d.name}</div>
              <div className="mt-3 rounded-lg border border-brand-line bg-brand-soft px-2.5 py-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-brand-deep">The model</p>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink"><BrandBadge brand={d.mb} className="size-4 text-[9px]" />{d.model}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Flow({ items, caption }: { items: { icon: 'brain' | 'message' | 'bot' | 'eye' | 'lightbulb' | 'code' | 'git' | 'cloud' | 'globe' | 'rocket'; who: string; title: string; text: string; highlight?: boolean }[]; caption: string }) {
  return (
    <Frame caption={caption}>
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {items.map((it, i) => (
          <div key={it.title} className="contents">
            <div className={`flex-1 rounded-xl border p-3.5 ${it.highlight ? 'border-brand-line bg-brand-soft' : 'border-line bg-surface'}`}>
              <div className="flex items-center gap-2">
                <span className={`grid size-7 place-items-center rounded-lg ${it.highlight ? 'bg-brand text-white' : 'bg-canvas text-ink-soft'}`}><Icon name={it.icon} className="size-3.5" /></span>
                <Label>{it.who}</Label>
              </div>
              <p className="mt-2 text-sm font-medium text-ink">{it.title}</p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{it.text}</p>
            </div>
            {i < items.length - 1 && (
              <div className="grid place-items-center text-faint">
                <ArrowRight className="hidden size-4 md:block" />
                <ArrowDown className="size-4 md:hidden" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  )
}

function StackLayers() {
  const layers = [
    { icon: 'layout' as const, name: 'Frontend', plain: 'What people see and tap', ex: 'React · Next.js · Expo · Tailwind' },
    { icon: 'server' as const, name: 'Backend / API', plain: 'The rules and secret logic', ex: 'Next.js server routes · Supabase Edge Functions' },
    { icon: 'database' as const, name: 'Database', plain: 'Where data is remembered', ex: 'PostgreSQL via Supabase' },
    { icon: 'cloud' as const, name: 'Hosting', plain: 'The computer on the internet that runs it', ex: 'Vercel · Expo EAS · Supabase cloud' },
  ]
  return (
    <Frame caption="Every app is a stack of layers. You pick one tool per layer. Beginners should pick boring, popular tools: the AI knows them best.">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        {layers.map((l, i) => (
          <div key={l.name} className="flex items-center gap-3 border-b border-line p-3.5 last:border-b-0" style={{ paddingLeft: `${14 + i * 10}px` }}>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-deep"><Icon name={l.icon} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{l.name} <span className="font-normal text-muted">· {l.plain}</span></p>
              <p className="truncate font-mono text-[12px] text-faint">{l.ex}</p>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function ContextWindow() {
  const parts = [
    { label: 'System + tools', w: 10, c: '#D6EAFB' },
    { label: 'AGENTS.md / CLAUDE.md', w: 8, c: '#AED4F3' },
    { label: 'Files it read', w: 30, c: '#7DB9E8' },
    { label: 'Chat so far', w: 22, c: '#3B8FD9' },
    { label: 'Your new prompt', w: 6, c: '#1F5A94' },
  ]
  return (
    <Frame caption="The context window is the AI's short-term memory for this one session. Everything it sees takes up space. When it fills up, older details get summarized (compacted) or forgotten, and quality drops. Good context engineering keeps it clean and relevant.">
      <div className="rounded-2xl border border-line bg-surface p-4">
        <Label>Context window · one session</Label>
        <div className="mt-3 flex h-9 overflow-hidden rounded-lg border border-line">
          {parts.map((p) => <div key={p.label} style={{ width: `${p.w}%`, background: p.c }} title={p.label} />)}
          <div className="flex-1 bg-[repeating-linear-gradient(135deg,#f3f3f0_0_6px,#fff_6px_12px)]" />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {parts.map((p) => (
            <span key={p.label} className="flex items-center gap-1.5 text-[12px] text-ink-soft"><span className="size-2.5 rounded-sm" style={{ background: p.c }} />{p.label}</span>
          ))}
          <span className="flex items-center gap-1.5 text-[12px] text-muted"><span className="size-2.5 rounded-sm border border-line bg-canvas" />Free space</span>
        </div>
      </div>
    </Frame>
  )
}

export function Diagram({ name }: { name: Name }) {
  switch (name) {
    case 'harness':
      return <Harness />
    case 'architect-builder':
      return (
        <Flow
          caption="The Architect–Builder loop. A chat model thinks and writes the plan. A coding agent does the building. A second opinion checks the work. You stay the boss the whole time."
          items={[
            { icon: 'lightbulb', who: 'You', title: 'The idea', text: 'What you want, who it is for, how it should feel.' },
            { icon: 'message', who: 'Architect', title: 'Chat model plans', text: 'ChatGPT / Claude chat turns it into a spec + master prompt.', highlight: true },
            { icon: 'bot', who: 'Builder', title: 'Coding agent builds', text: 'Claude Code / Codex / Antigravity writes and runs the code.', highlight: true },
            { icon: 'eye', who: 'Reviewer', title: 'Second opinion', text: 'Another model or a fresh session reviews the result.' },
          ]}
        />
      )
    case 'stack-layers':
      return <StackLayers />
    case 'context-window':
      return <ContextWindow />
    case 'ship-pipeline':
      return (
        <Flow
          caption="How code gets from your laptop to a real link anyone can open. After the first setup, shipping is just: commit, push, wait one minute."
          items={[
            { icon: 'code', who: 'Laptop', title: 'You + agent code', text: 'Runs on localhost while you build.' },
            { icon: 'git', who: 'Git', title: 'Commit + push', text: 'Save a checkpoint and upload it to GitHub.' },
            { icon: 'cloud', who: 'Vercel', title: 'Auto build', text: 'Vercel sees the push and builds your app.', highlight: true },
            { icon: 'globe', who: 'Internet', title: 'Live URL', text: 'your-app.vercel.app — share it with anyone.' },
          ]}
        />
      )
  }
}
