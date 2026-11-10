/**
 * Content schema for the whole course.
 *
 * "Inline" strings support a tiny markdown subset:
 *   **bold**   *italic*   `inline code`   [link text](https://url)
 * Nothing else (no headings, no lists inside inline strings).
 */
export type Inline = string

/** Icons available to content. Each maps to a lucide-react icon in the UI. */
export type IconName =
  | 'brain' | 'bot' | 'wrench' | 'building' | 'terminal' | 'code' | 'monitor' | 'smartphone'
  | 'database' | 'server' | 'cloud' | 'rocket' | 'sparkles' | 'message' | 'lightbulb' | 'target'
  | 'layers' | 'puzzle' | 'book' | 'shield' | 'lock' | 'key' | 'bug' | 'search' | 'git'
  | 'zap' | 'coins' | 'gauge' | 'palette' | 'layout' | 'gamepad' | 'wallet' | 'dumbbell'
  | 'calendar' | 'check' | 'x' | 'alert' | 'info' | 'users' | 'heart' | 'globe' | 'image'
  | 'file' | 'folder' | 'list' | 'map' | 'compass' | 'flask' | 'graduation' | 'package'
  | 'workflow' | 'eye' | 'pen' | 'clock' | 'trophy' | 'music' | 'chef' | 'book-open' | 'notebook'

/** Brand chips (rendered as small colored badges, no real logos). */
export type Brand =
  | 'claude' | 'claude-code' | 'codex' | 'openai' | 'gemini' | 'deepseek' | 'cursor' | 'opencode' | 'antigravity'
  | 'vercel' | 'supabase' | 'github' | 'expo' | 'react' | 'tailwind' | 'nextjs' | 'generic'

export type Block =
  /** Normal paragraph. */
  | { type: 'p'; text: Inline }
  /** Section heading inside a lesson. */
  | { type: 'h2'; text: string }
  /** Sub heading. */
  | { type: 'h3'; text: string }
  /** Bullet or numbered list. */
  | { type: 'list'; ordered?: boolean; items: Inline[] }
  /** Highlighted box. tone: tip (green), info (blue), warn (amber), analogy (purple), key (dark) */
  | { type: 'callout'; tone: 'tip' | 'info' | 'warn' | 'analogy' | 'key'; title?: string; text: Inline }
  /** Grid of small cards. */
  | {
      type: 'cards'
      columns?: 2 | 3
      items: { icon?: IconName; brand?: Brand; eyebrow?: string; title: string; text?: Inline; tag?: string }[]
    }
  /** Simple table. First column is rendered bold. */
  | { type: 'table'; headers: string[]; rows: Inline[][] }
  /** Copyable code/terminal block. Use real newlines in `code`. */
  | { type: 'code'; label?: string; lang?: string; code: string }
  /** Copyable prompt (rendered as a chat-like prompt card). */
  | { type: 'prompt'; label?: string; text: string }
  /** Side by side: weak vs strong. Usually prompts. */
  | { type: 'compare'; bad: { title?: string; text: string; note?: Inline }; good: { title?: string; text: string; note?: Inline } }
  /** Numbered steps with titles. */
  | { type: 'steps'; items: { title: string; text: Inline }[] }
  /** One multiple-choice question, checked instantly in the UI. `answer` is the 0-based index. */
  | { type: 'quiz'; question: string; options: string[]; answer: number; explain: Inline }
  /** Built-in illustrated diagrams. */
  | { type: 'diagram'; name: 'harness' | 'architect-builder' | 'stack-layers' | 'context-window' | 'ship-pipeline' }
  /** Short TL;DR box, best placed at the end of a lesson. */
  | { type: 'keypoints'; title?: string; items: Inline[] }
  /** Glossary style term/definition list. */
  | { type: 'terms'; items: { term: string; def: Inline }[] }
  | { type: 'divider' }

export interface Project {
  category: 'Web app' | 'Mobile app' | 'Game' | 'AI app' | 'Website'
  difficulty: 'Starter' | 'Beginner' | 'Intermediate'
  /** e.g. "2–3 hours" */
  time: string
  icon: IconName
  /** One-sentence hook shown on the card. */
  pitch: string
  /** What you will learn by building it. */
  learn: string[]
  features: string[]
  stack: { layer: string; choice: string; why: Inline }[]
  model: { pick: string; why: Inline; alt: Inline }
  harness: { pick: string; why: Inline }
  skills: { name: string; why: Inline }[]
  /** The full master prompt, copy-paste ready. */
  masterPrompt: string
  /** Follow-up prompts in order, after the master prompt. */
  buildSteps: { title: string; prompt: string }[]
  pitfalls: Inline[]
  stretch: Inline[]
}

export interface Lesson {
  slug: string
  title: string
  /** One sentence under the title. */
  summary: string
  minutes: number
  blocks: Block[]
  /** Only for the project library course. */
  project?: Project
}

export interface Course {
  /** 0 = "Before starting", 1..8 = courses */
  number: number
  slug: string
  title: string
  /** Short line used on cards. */
  tagline: string
  icon: IconName
  lessons: Lesson[]
}
