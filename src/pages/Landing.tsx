import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronDown, MessageSquare, Bot, Rocket, Sparkles, Megaphone, BookOpen } from 'lucide-react'
import { courses, lessonPath } from '../content'
import { PixelBot, PixelCloud, Wordmark } from '../components/Logo'
import { BrandBadge, Icon } from '../components/Icon'
import type { Brand } from '../content/types'

const ease = [0.22, 1, 0.36, 1] as const
const rise = (d = 0) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, delay: d, ease } })

const projectLib = courses.find((c) => c.number === 6)
const projectLessons = projectLib ? projectLib.lessons.filter((l) => l.project) : []
const lessonCount = courses.reduce((n, c) => n + c.lessons.length, 0)

function FloatingChip({ brand, label, className, delay }: { brand: Brand; label: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.5 }, scale: { delay, duration: 0.5 }, y: { delay, duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' } }}
      className={`absolute flex items-center gap-2 rounded-xl border border-line bg-surface/95 px-3 py-2 text-[13px] font-medium shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] backdrop-blur ${className}`}
    >
      <BrandBadge brand={brand} className="size-5 text-[11px]" /> {label}
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-20 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-20">
      <div>
        <motion.p {...rise()} className="flex items-center gap-2.5 text-[14px] text-muted">
          <PixelBot className="h-3.5 w-auto" />
          <span>Made for my classmates <span className="text-faint">— free, no sign up</span></span>
        </motion.p>
        <motion.h1 {...rise(0.05)} className="mt-6 text-[44px] leading-[1.02] font-medium tracking-[-0.035em] text-ink sm:text-[62px]">
          Build and ship real software <span className="font-serif text-[1.12em] font-normal tracking-normal italic text-brand">with AI</span>
        </motion.h1>
        <motion.p {...rise(0.1)} className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-muted">
          A beginner-friendly course that takes you from "what even is an AI model?" to shipping real apps, step by step, without letting the AI run off with your project.
        </motion.p>
        <motion.div {...rise(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/learn" className="group inline-flex items-center gap-2.5 rounded-xl bg-brand px-5 py-3 text-[15px] font-medium text-white shadow-[0_10px_24px_-10px_rgba(42,117,190,0.45)] transition hover:bg-brand-deep active:scale-[0.98]">
            <PixelBot className="h-4 w-auto" color="#fff" eye="#2A75BE" /> Get started
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
          <a href="#outline" className="rounded-xl border border-line bg-surface px-5 py-3 text-[15px] font-medium text-ink-soft transition hover:border-line-strong hover:text-ink">See the outline</a>
        </motion.div>
        <motion.div {...rise(0.2)} className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-faint">
          <span>{courses.length} courses</span><span>{lessonCount} lessons</span><span>{projectLessons.length} guided projects</span><span>Zero coding experience needed</span>
        </motion.div>
      </div>

      <div className="relative h-[340px] sm:h-[420px]">
        <div className="absolute inset-4 rounded-[40px] bg-grid opacity-70 [mask-image:radial-gradient(closest-side,black,transparent)]" />
        <PixelCloud className="absolute top-8 left-6 w-24 animate-drift opacity-90" />
        <PixelCloud className="absolute top-24 right-0 w-16 animate-drift opacity-60 [animation-delay:-6s] [animation-direction:reverse]" />
        <PixelCloud className="absolute bottom-10 left-16 w-14 animate-drift opacity-40 [animation-delay:-12s]" />
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease }} className="absolute inset-0 grid place-items-center">
          <PixelBot className="h-40 w-auto animate-float drop-shadow-[0_24px_24px_rgba(125,185,232,0.35)] sm:h-52" blink />
        </motion.div>
        <FloatingChip brand="claude-code" label="Claude Code" className="top-[18%] right-[4%]" delay={0.4} />
        <FloatingChip brand="codex" label="Codex" className="bottom-[22%] left-[2%]" delay={0.6} />
        <FloatingChip brand="antigravity" label="Antigravity" className="right-[10%] bottom-[8%]" delay={0.8} />
        <FloatingChip brand="supabase" label="Supabase" className="top-[6%] left-[24%]" delay={1} />
      </div>
    </section>
  )
}

function Announcements() {
  const items = [
    { icon: Megaphone, badge: 'New', title: `Project library: ${projectLessons.length} guided builds`, text: 'Each one comes with a master prompt, tech stack, skills and the best AI model for the job.', to: projectLib ? lessonPath(projectLib, projectLib.lessons[0]) : '/learn' },
    { icon: BookOpen, badge: 'Seminar edition', title: 'Learn it together with your classmates', text: 'Read a lesson, try the prompts, then build one project as a group by the end of the course.', to: '/learn' },
  ]
  return (
    <section className="mx-auto grid max-w-6xl gap-3 px-4 sm:px-6 md:grid-cols-2">
      {items.map((it, i) => (
        <motion.div key={it.title} {...rise(i * 0.06)}>
          <Link to={it.to} className="group flex h-full gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-line-strong hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-deep"><it.icon className="size-[18px]" /></span>
            <div>
              <span className="rounded-full bg-brand-soft px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-brand-deep">{it.badge}</span>
              <p className="mt-2 font-medium">{it.title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">{it.text}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: MessageSquare, title: 'Describe it', text: 'You explain what you want in plain words, like briefing a smart teammate.' },
    { icon: Bot, title: 'AI builds it', text: 'A coding agent writes the code, runs it and fixes its own errors.' },
    { icon: Rocket, title: 'You steer and ship', text: 'You test, give feedback, save checkpoints and put it online.' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
      <motion.p {...rise()} className="font-mono text-[12px] uppercase tracking-[0.1em] text-brand-deep">What is vibe coding?</motion.p>
      <motion.h2 {...rise(0.05)} className="mt-3 max-w-2xl text-[32px] leading-tight font-medium tracking-tight sm:text-[40px]">
        You are the <span className="font-serif italic text-brand">director.</span> The AI is your crew.
      </motion.h2>
      <motion.p {...rise(0.1)} className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-muted">
        Vibe coding means building software by talking to AI instead of typing every line yourself. It is real, it is powerful, and it still needs a human who knows what good looks like. This course teaches you to be that human.
      </motion.p>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div key={s.title} {...rise(0.08 * i)} className="relative rounded-2xl border border-line bg-surface p-6">
            <span className="absolute top-5 right-5 font-mono text-[12px] text-faint">0{i + 1}</span>
            <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand-deep"><s.icon className="size-[18px]" /></span>
            <p className="mt-5 text-[17px] font-medium">{s.title}</p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Outline() {
  const [open, setOpen] = useState<string | null>(courses[0]?.slug ?? null)
  return (
    <section id="outline" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-28 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-24 md:self-start">
          <motion.p {...rise()} className="font-mono text-[12px] uppercase tracking-[0.1em] text-brand-deep">The outline</motion.p>
          <motion.h2 {...rise(0.05)} className="mt-3 text-[32px] leading-tight font-medium tracking-tight sm:text-[40px]">
            {courses.length} courses, from <span className="font-serif italic text-brand">zero</span> to shipped.
          </motion.h2>
          <motion.p {...rise(0.1)} className="mt-4 text-[16px] leading-relaxed text-muted">
            Go in order the first time. Every course builds on the one before it, and every lesson ends with something you can try right away.
          </motion.p>
          <motion.div {...rise(0.15)}>
            <Link to="/learn" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[14px] font-medium text-white transition hover:bg-ink-soft">
              Open the dashboard <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
        <div className="space-y-2">
          {courses.map((c, i) => {
            const isOpen = open === c.slug
            return (
              <motion.div key={c.slug} {...rise(0.03 * i)} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <button type="button" onClick={() => setOpen(isOpen ? null : c.slug)} aria-expanded={isOpen} className="flex w-full items-center gap-4 p-4 text-left sm:p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-deep"><Icon name={c.icon} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11.5px] text-faint">Course {c.number} · {c.lessons.length} lessons</span>
                    <span className="mt-0.5 block text-[16.5px] font-medium tracking-tight">{c.title}</span>
                    <span className="mt-0.5 block text-[14px] leading-snug text-muted">{c.tagline}</span>
                  </span>
                  <ChevronDown className={`size-4 shrink-0 text-faint transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25, ease }} className="overflow-hidden">
                      <div className="border-t border-line px-4 py-3 sm:px-5">
                        {c.lessons.map((l, j) => (
                          <li key={l.slug}>
                            <Link to={lessonPath(c, l)} className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-[14px] text-ink-soft transition hover:bg-canvas hover:text-ink">
                              <span className="w-5 shrink-0 font-mono text-[12px] text-faint">{j + 1}</span>
                              <span className="flex-1">{l.title}</span>
                              <span className="shrink-0 font-mono text-[11.5px] text-faint">{l.project ? l.project.difficulty : `${l.minutes}m`}</span>
                            </Link>
                          </li>
                        ))}
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectMarquee() {
  if (!projectLib) return null
  const row = [...projectLessons, ...projectLessons]
  return (
    <section className="pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p {...rise()} className="font-mono text-[12px] uppercase tracking-[0.1em] text-brand-deep">What you will build</motion.p>
        <motion.h2 {...rise(0.05)} className="mt-3 max-w-2xl text-[32px] leading-tight font-medium tracking-tight sm:text-[40px]">
          Real projects with <span className="font-serif italic text-brand">copy-paste</span> master prompts.
        </motion.h2>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <motion.div className="flex w-max gap-3" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 50, ease: 'linear', repeat: Infinity }}>
          {row.map((l, i) => (
            <Link key={`${l.slug}-${i}`} to={lessonPath(projectLib, l)} className="w-[260px] shrink-0 rounded-2xl border border-line bg-surface p-5 transition hover:border-brand-line">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand-deep"><Icon name={l.project!.icon} /></span>
                <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">{l.project!.category}</span>
              </div>
              <p className="mt-4 font-medium">{l.title}</p>
              <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-muted">{l.project!.pitch}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const faqs = [
  { q: 'Do I need to know how to code?', a: 'No. The course assumes zero experience. You will slowly learn to read code as you go, because a good vibe coder understands what the AI built, but you never have to write it all by hand.' },
  { q: 'Is it really free? Do I need an account?', a: 'Yes, and no account. Click Get started and you are in. Your progress is saved in your own browser.' },
  { q: 'Which AI do I need to pay for?', a: 'You can start free. For serious building, one paid plan of a coding agent (Claude Code or Codex) is the best value. Course 1 explains exactly which one to pick and why.' },
  { q: 'Will I be able to build a real app at the end?', a: 'Yes. The project library has guided builds from a 1-hour starter to a full app with a database, login and a live URL you can share.' },
  { q: 'What computer do I need?', a: 'Any Windows, Mac or Linux laptop that can run a browser, VS Code and Node.js. For mobile apps you can test on your own phone with Expo Go.' },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 pt-28 sm:px-6">
      <motion.h2 {...rise()} className="text-center text-[32px] font-medium tracking-tight sm:text-[40px]">Questions <span className="font-serif italic text-brand">answered</span></motion.h2>
      <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium">
              {f.q}
              <ChevronDown className={`size-4 shrink-0 text-faint transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 pb-10 sm:px-6">
      <motion.div {...rise()} className="relative overflow-hidden rounded-[32px] bg-brand px-6 py-16 text-center text-white sm:py-20">
        <PixelCloud className="absolute top-8 left-10 w-24 animate-drift opacity-25" color="#fff" />
        <PixelCloud className="absolute right-12 bottom-10 w-16 animate-drift opacity-20 [animation-delay:-9s]" color="#fff" />
        <PixelBot className="mx-auto h-14 w-auto animate-float" color="#fff" eye="#2A75BE" blink />
        <h2 className="mx-auto mt-6 max-w-xl text-[32px] leading-tight font-medium tracking-tight sm:text-[42px]">Your first app is one prompt away.</h2>
        <p className="mx-auto mt-3 max-w-md text-[16px] text-white/75">No account, no payment, no excuses. Open the course and start with lesson one.</p>
        <Link to="/learn" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-medium text-brand-deep transition hover:bg-white/90 active:scale-[0.98]">
          <Sparkles className="size-4" /> Get started for free
        </Link>
      </motion.div>
      <footer className="mt-10 flex flex-col items-center justify-between gap-3 text-[13px] text-faint sm:flex-row">
        <span>Janver's Ultimate Vibe Coding Course · made for my classmates</span>
        <span>Learn it. Build it. Ship it.</span>
      </footer>
    </section>
  )
}

export default function Landing() {
  return (
    <div className="min-h-dvh overflow-x-clip">
      <header className="sticky top-0 z-40 border-b border-transparent bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/"><Wordmark /></Link>
          <nav className="flex items-center gap-1 text-[14px] text-muted sm:gap-2">
            <a href="#outline" className="hidden rounded-lg px-3 py-1.5 hover:text-ink sm:block">Outline</a>
            <a href="#faq" className="hidden rounded-lg px-3 py-1.5 hover:text-ink sm:block">FAQ</a>
            <Link to="/learn" className="rounded-lg border border-line bg-surface px-3 py-1.5 font-medium text-ink transition hover:border-line-strong">Get started</Link>
          </nav>
        </div>
      </header>
      <Hero />
      <Announcements />
      <HowItWorks />
      <Outline />
      <ProjectMarquee />
      <Faq />
      <FinalCta />
    </div>
  )
}
