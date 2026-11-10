import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight, Play, Clock, BookOpen, Trophy } from 'lucide-react'
import { courses, flat, intro, lessonPath, totalLessons } from '../content'
import { lessonKey, useProgress } from '../lib/progress'
import { Icon } from '../components/Icon'
import { PixelBot, PixelCloud } from '../components/Logo'

export default function Dashboard() {
  const { name, done, last, isDone } = useProgress()
  const lastLoc = flat.find((f) => lessonKey(f.course.slug, f.lesson.slug) === last)
  const nextUp = flat.find((f) => !isDone(lessonKey(f.course.slug, f.lesson.slug)))
  const target = lastLoc && !isDone(last!) ? lastLoc : nextUp ?? flat[0]
  const started = done.length > 0 || !!last
  const minutes = flat.reduce((s, f) => s + f.lesson.minutes, 0)
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="mx-auto max-w-[980px] px-4 py-10 sm:px-8 lg:py-16">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[14px] text-muted">{greet}, {name} 👋</p>
        <h1 className="mt-2 text-[32px] leading-tight font-medium tracking-tight sm:text-[38px]">
          {started ? <>Welcome back. Let's keep <span className="font-serif text-[1.15em] italic text-brand">shipping.</span></> : <>Your vibe coding journey <span className="font-serif text-[1.15em] italic text-brand">starts here.</span></>}
        </h1>
      </motion.div>

      {/* Continue card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
        className="relative mt-8 overflow-hidden rounded-3xl border border-brand-line bg-brand p-6 text-white sm:p-8">
        <PixelCloud className="absolute top-6 right-28 w-20 animate-drift opacity-25" color="#fff" />
        <PixelCloud className="absolute right-6 bottom-5 w-14 animate-drift opacity-20 [animation-delay:-8s]" color="#fff" />
        <PixelBot className="absolute right-8 bottom-10 hidden h-20 w-auto animate-float opacity-95 sm:block" color="#fff" eye="#AED4F3" />
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">{started ? 'Continue where you left off' : 'Start with the basics'}</p>
        <p className="mt-2 max-w-md text-[22px] leading-snug font-medium">{target.lesson.title}</p>
        <p className="mt-1 max-w-md text-[14px] text-white/75">{target.course.number === 0 ? 'Before starting' : `Course ${target.course.number} · ${target.course.title}`}</p>
        <Link to={lessonPath(target.course, target.lesson)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[14px] font-medium text-brand-deep transition hover:bg-white/90 active:scale-[0.98]">
          <Play className="size-4 fill-current" /> {started ? 'Continue lesson' : 'Start learning'}
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: BookOpen, label: 'Lessons done', value: `${done.length}/${totalLessons}` },
          { icon: Trophy, label: 'Courses', value: `${courses.filter((c) => c.lessons.every((l) => isDone(lessonKey(c.slug, l.slug)))).length}/${courses.length}` },
          { icon: Clock, label: 'Total content', value: `~${Math.round(minutes / 60)} hrs` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-surface p-4">
            <s.icon className="size-4 text-muted" />
            <p className="mt-3 font-mono text-[20px] font-medium tracking-tight">{s.value}</p>
            <p className="text-[12.5px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Course grid */}
      <div className="mt-12 flex items-end justify-between">
        <h2 className="text-[22px] font-medium tracking-tight">All courses</h2>
        <Link to={lessonPath(intro, intro.lessons[0])} className="text-[14px] text-muted hover:text-ink">Before starting →</Link>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {courses.map((c, i) => {
          const d = c.lessons.filter((l) => isDone(lessonKey(c.slug, l.slug))).length
          const pct = Math.round((d / c.lessons.length) * 100)
          const first = c.lessons.find((l) => !isDone(lessonKey(c.slug, l.slug))) ?? c.lessons[0]
          return (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.04 * i }}>
              <Link to={lessonPath(c, first)} className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_10px_30px_-16px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand-deep"><Icon name={c.icon} /></span>
                  <span className="font-mono text-[12px] text-faint">Course {c.number}</span>
                </div>
                <p className="mt-4 text-[17px] font-medium tracking-tight">{c.title}</p>
                <p className="mt-1 flex-1 text-[14px] leading-relaxed text-muted">{c.tagline}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} /></div>
                  <span className="font-mono text-[12px] text-muted">{d}/{c.lessons.length}</span>
                  <ArrowRight className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-brand-deep" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
