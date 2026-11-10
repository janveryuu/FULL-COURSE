import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, Clock } from 'lucide-react'
import { courseLabel, flat, lessonPath, locate } from '../content'
import { Blocks, slugify } from '../components/Blocks'
import { ProjectMeta, ProjectView } from '../components/ProjectView'
import { lessonKey, useProgress } from '../lib/progress'
import { Inline } from '../components/Inline'

function Toc({ items }: { items: string[] }) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const els = items.map((t) => document.getElementById(slugify(t))).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [items])
  if (items.length < 2) return null
  return (
    <nav className="sticky top-24 hidden w-52 shrink-0 self-start 2xl:block" aria-label="On this page">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">On this page</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((t) => {
          const id = slugify(t)
          return (
            <li key={id}>
              <a href={`#${id}`} className={`-ml-px block border-l py-0.5 pl-3 text-[13px] leading-snug transition ${active === id ? 'border-brand text-brand-deep' : 'border-transparent text-muted hover:text-ink'}`}>{t}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function LessonPage() {
  const params = useParams()
  const found = locate(params.course, params.lesson)
  const { isDone, toggle, visit, markDone } = useProgress()

  const key = found ? lessonKey(found.course.slug, found.lesson.slug) : ''
  useEffect(() => { if (key) visit(key) }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  const toc = useMemo(() => {
    if (!found) return []
    const hs = found.lesson.blocks.filter((b) => b.type === 'h2').map((b) => (b as { text: string }).text)
    if (found.lesson.project) return ['Tech stack', 'Best AI setup', 'Skills to install', 'Master prompt', 'Build steps', 'Common pitfalls', 'Level it up']
    return hs
  }, [found])

  if (!found) return <Navigate to="/learn" replace />
  const { course, lesson, index } = found
  const pos = flat.findIndex((f) => f.course.slug === course.slug && f.lesson.slug === lesson.slug)
  const prev = flat[pos - 1]
  const next = flat[pos + 1]
  const done = isDone(key)
  const numbered = !(course.number === 6 && index > 0)

  return (
    <div className="mx-auto flex max-w-[1100px] justify-center gap-12 px-4 py-10 sm:px-8 lg:py-20">
      <motion.article
        key={key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[700px] min-w-0"
      >
        <p className="text-[14px] text-muted">
          <Link to="/learn" className="hover:text-ink">{courseLabel(course)}</Link>
          {course.number > 0 && <> · {course.title}</>}
        </p>
        <h1 className="mt-3 text-[30px] leading-tight font-medium tracking-tight text-ink sm:text-[34px]">
          {numbered ? `${index + 1}. ` : ''}{lesson.title}
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-muted"><Inline text={lesson.summary} /></p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {lesson.project ? <ProjectMeta p={lesson.project} /> : (
            <span className="flex items-center gap-1.5 text-[13px] text-faint"><Clock className="size-3.5" /> {lesson.minutes} min read</span>
          )}
          {done && <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[12px] text-emerald-700"><Check className="size-3" /> Completed</span>}
        </div>

        <div className="mt-6">
          <Blocks blocks={lesson.blocks} />
          {lesson.project && <ProjectView p={lesson.project} />}
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">{done ? 'Nice work, lesson complete!' : 'Finished reading?'}</p>
            <p className="text-[14px] text-muted">{done ? 'Your progress is saved in this browser.' : 'Mark it complete to track your progress.'}</p>
          </div>
          <button
            type="button"
            onClick={() => toggle(key)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium transition active:scale-[0.98] ${done ? 'border border-line bg-canvas text-ink-soft hover:bg-line/40' : 'bg-brand text-white shadow-[0_6px_16px_-6px_rgba(42,117,190,0.4)] hover:bg-brand-deep'}`}
          >
            <Check className="size-4" /> {done ? 'Completed' : 'Mark as complete'}
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link to={lessonPath(prev.course, prev.lesson)} className="group rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong">
              <span className="flex items-center gap-1.5 text-[12.5px] text-muted"><ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" /> Previous</span>
              <span className="mt-1 block text-[15px] font-medium">{prev.lesson.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link
              to={lessonPath(next.course, next.lesson)}
              onClick={() => markDone(key)}
              className="group rounded-2xl border border-brand-line bg-brand-soft/50 p-4 text-right transition hover:bg-brand-soft"
            >
              <span className="flex items-center justify-end gap-1.5 text-[12.5px] text-brand-deep">
                Next{next.course.slug !== course.slug ? ` · ${courseLabel(next.course)}` : ''} <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-[15px] font-medium">{next.lesson.title}</span>
            </Link>
          )}
        </div>
      </motion.article>
      <Toc items={toc} />
    </div>
  )
}
