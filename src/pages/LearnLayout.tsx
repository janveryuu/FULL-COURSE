import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Info, Menu, X, Award, LayoutDashboard, Check, Pencil, RotateCcw } from 'lucide-react'
import { courses, intro, lessonPath, totalLessons } from '../content'
import type { Course } from '../content/types'
import { lessonKey, useProgress } from '../lib/progress'
import { Icon } from '../components/Icon'
import { PixelBot } from '../components/Logo'

function CourseGroup({ course, onNavigate }: { course: Course; onNavigate: () => void }) {
  const params = useParams()
  const active = params.course === course.slug
  const [open, setOpen] = useState(active)
  const { isDone } = useProgress()
  useEffect(() => { if (active) setOpen(true) }, [active])
  const done = course.lessons.filter((l) => isDone(lessonKey(course.slug, l.slug))).length
  const complete = done === course.lessons.length

  return (
    <div className="px-3">
      <div className="flex items-center justify-between px-3 pt-4 pb-1">
        <span className="text-[12px] text-faint">Course {course.number}</span>
        <span className={`rounded-full border px-1.5 py-px font-mono text-[10.5px] ${complete ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-line text-faint'}`}>
          {complete ? '✓ done' : `${done}/${course.lessons.length}`}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[14.5px] transition hover:bg-canvas ${active ? 'text-ink' : 'text-ink-soft'}`}
      >
        <Icon name={course.icon} className={`size-4 shrink-0 ${active ? 'text-brand-deep' : 'text-muted'}`} />
        <span className="flex-1 leading-snug">{course.title}</span>
        <ChevronDown className={`size-4 shrink-0 text-faint transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="ml-5 overflow-hidden border-l border-line pl-2"
          >
            {course.lessons.map((l, i) => {
              const d = isDone(lessonKey(course.slug, l.slug))
              return (
                <li key={l.slug}>
                  <NavLink
                    to={lessonPath(course, l)}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group my-0.5 flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[13.5px] leading-snug transition ${isActive ? 'bg-brand-soft text-brand-deep' : 'text-muted hover:bg-canvas hover:text-ink'}`
                    }
                  >
                    <span className={`mt-[2px] grid size-[15px] shrink-0 place-items-center rounded-full border ${d ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-line-strong'}`}>
                      {d && <Check className="size-2.5" strokeWidth={3} />}
                    </span>
                    <span>{course.number === 6 && i > 0 ? l.title : `${i + 1}. ${l.title}`}</span>
                  </NavLink>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function Profile() {
  const { name, setName, reset, done } = useProgress()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  return (
    <div className="flex items-center gap-3 border-t border-line p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft"><PixelBot className="h-4 w-auto" /></span>
      {editing ? (
        <form
          className="flex-1"
          onSubmit={(e) => { e.preventDefault(); setName(draft); setEditing(false) }}
        >
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => { setName(draft); setEditing(false) }}
            maxLength={32}
            aria-label="Your name"
            className="w-full rounded-md border border-brand-line bg-surface px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-soft"
          />
        </form>
      ) : (
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="text-[12px] text-muted">Student · no account needed</p>
        </div>
      )}
      {!editing && (
        <div className="flex gap-0.5">
          <button type="button" title="Edit name" aria-label="Edit name" onClick={() => { setDraft(name); setEditing(true) }} className="rounded-md p-1.5 text-faint hover:bg-canvas hover:text-ink"><Pencil className="size-3.5" /></button>
          {done.length > 0 && (
            <button type="button" title="Reset progress" aria-label="Reset progress" onClick={() => { if (confirm('Reset all your lesson progress?')) reset() }} className="rounded-md p-1.5 text-faint hover:bg-canvas hover:text-rose-600"><RotateCcw className="size-3.5" /></button>
          )}
        </div>
      )}
    </div>
  )
}

function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  const { done } = useProgress()
  const pct = Math.round((done.length / totalLessons) * 100)
  const first = intro.lessons[0]
  return (
    <div className="flex h-full flex-col">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 border-b border-line p-5">
        <PixelBot className="h-7 w-auto shrink-0" />
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold tracking-tight">Janver</span>
          <span className="block text-[12px] text-muted">Ultimate Vibe Coding Course</span>
        </span>
      </Link>
      <div className="space-y-0.5 border-b border-line p-3">
        <NavLink end to="/learn" onClick={onNavigate} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] transition ${isActive ? 'bg-brand-soft text-brand-deep' : 'text-ink-soft hover:bg-canvas'}`}>
          <LayoutDashboard className="size-4" /> Dashboard
        </NavLink>
        <NavLink to={lessonPath(intro, first)} onClick={onNavigate} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] transition ${isActive ? 'bg-brand-soft text-brand-deep' : 'text-ink-soft hover:bg-canvas'}`}>
          <Info className="size-4" /> Before starting this course
        </NavLink>
      </div>
      <nav className="flex-1 overflow-y-auto pb-4 scrollbar-thin" aria-label="Courses">
        {courses.map((c) => <CourseGroup key={c.slug} course={c} onNavigate={onNavigate} />)}
      </nav>
      <div className="px-3 pb-3">
        <div className="rounded-2xl border border-line p-3.5">
          <p className="flex items-center gap-2 text-[13px] font-medium"><Award className="size-4" /> Your progress</p>
          <div className="mt-2.5 flex items-center justify-between text-[12.5px] text-muted">
            <span>Lessons completed</span>
            <span className="font-mono text-ink">{done.length}/{totalLessons}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas">
            <motion.div className="h-full rounded-full bg-brand" initial={false} animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
          </div>
        </div>
      </div>
      <Profile />
    </div>
  )
}

export default function LearnLayout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <div className="min-h-dvh">
      {/* Desktop floating sidebar */}
      <aside className="fixed top-4 bottom-4 left-4 z-30 hidden w-[272px] overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] lg:block">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-canvas/85 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-2.5">
          <PixelBot className="h-6 w-auto" />
          <span className="text-[15px] font-semibold tracking-tight">Janver</span>
        </Link>
        <button type="button" onClick={() => setOpen(true)} aria-label="Open course menu" className="rounded-lg border border-line bg-surface p-2"><Menu className="size-4" /></button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/25 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              className="fixed top-2 bottom-2 left-2 z-50 w-[min(300px,calc(100vw-16px))] overflow-hidden rounded-[22px] border border-line bg-surface shadow-xl lg:hidden"
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            >
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="absolute top-4 right-3 z-10 rounded-lg p-2 text-muted hover:bg-canvas"><X className="size-4" /></button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="lg:pl-[300px]">
        <Outlet />
      </main>
    </div>
  )
}
