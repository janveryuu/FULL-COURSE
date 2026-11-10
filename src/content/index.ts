import type { Course, Lesson } from './types'
import { start } from './courses/c0-start'
import { toolkit } from './courses/c1-toolkit'
import { stack } from './courses/c2-stack'
import { prompting } from './courses/c3-prompting'
import { workflow } from './courses/c4-workflow'
import { skills } from './courses/c5-skills'
import { projects } from './courses/c6-projects'
import { ship } from './courses/c7-ship'
import { engineer } from './courses/c8-engineer'

export const intro: Course = start
export const courses: Course[] = [toolkit, stack, prompting, workflow, skills, projects, ship, engineer]
export const allCourses: Course[] = [intro, ...courses]

export interface Located { course: Course; lesson: Lesson; index: number }

/** Every lesson in reading order, used for prev/next and progress totals. */
export const flat: Located[] = allCourses.flatMap((course) => course.lessons.map((lesson, index) => ({ course, lesson, index })))

export const totalLessons = flat.length

export function locate(courseSlug?: string, lessonSlug?: string): Located | undefined {
  return flat.find((f) => f.course.slug === courseSlug && f.lesson.slug === lessonSlug)
}

export const lessonPath = (course: Course, lesson: Lesson) => `/learn/${course.slug}/${lesson.slug}`
export const courseLabel = (course: Course) => (course.number === 0 ? 'Before you start' : `Course ${course.number}`)
