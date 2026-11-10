import {
  Brain, Bot, Wrench, Building, Terminal, Code, Monitor, Smartphone, Database, Server, Cloud, Rocket,
  Sparkles, MessageSquare, Lightbulb, Target, Layers, Puzzle, Book, Shield, Lock, KeyRound, Bug, Search,
  GitBranch, Zap, Coins, Gauge, Palette, LayoutDashboard, Gamepad2, Wallet, Dumbbell, Calendar, Check, X,
  TriangleExclamationPoint, Info, Users, Heart, Globe, Image, FileText, Folder, List, Map, Compass,
  FlaskConical, GraduationCap, Package, Workflow, Eye, PenLine, Clock, Trophy, Headphones, ChefHat,
  BookOpen, NotebookPen, type LucideIcon,
} from 'lucide-react'
import type { Brand, IconName } from '../content/types'

const map: Record<IconName, LucideIcon> = {
  brain: Brain, bot: Bot, wrench: Wrench, building: Building, terminal: Terminal, code: Code,
  monitor: Monitor, smartphone: Smartphone, database: Database, server: Server, cloud: Cloud,
  rocket: Rocket, sparkles: Sparkles, message: MessageSquare, lightbulb: Lightbulb, target: Target,
  layers: Layers, puzzle: Puzzle, book: Book, shield: Shield, lock: Lock, key: KeyRound, bug: Bug,
  search: Search, git: GitBranch, zap: Zap, coins: Coins, gauge: Gauge, palette: Palette,
  layout: LayoutDashboard, gamepad: Gamepad2, wallet: Wallet, dumbbell: Dumbbell, calendar: Calendar,
  check: Check, x: X, alert: TriangleExclamationPoint, info: Info, users: Users, heart: Heart,
  globe: Globe, image: Image, file: FileText, folder: Folder, list: List, map: Map, compass: Compass,
  flask: FlaskConical, graduation: GraduationCap, package: Package, workflow: Workflow, eye: Eye,
  pen: PenLine, clock: Clock, trophy: Trophy, music: Headphones, chef: ChefHat, 'book-open': BookOpen,
  notebook: NotebookPen,
}

export function Icon({ name, className = 'size-4', strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const C = map[name] ?? Sparkles
  return <C className={className} strokeWidth={strokeWidth} aria-hidden />
}

const brands: Record<Brand, { bg: string; fg: string; label: string }> = {
  'claude-code': { bg: '', fg: '', label: '/icons/claude-code.png' },
  codex: { bg: '', fg: '', label: '/icons/codex.png' },
  claude: { bg: '#F6E3DA', fg: '#C15F3C', label: '✳' },
  openai: { bg: '#E7E7E7', fg: '#111111', label: '◎' },
  gemini: { bg: '#E3EBFD', fg: '#3B6FE0', label: '✦' },
  deepseek: { bg: '#E2E8FB', fg: '#4D6BFE', label: '◆' },
  cursor: { bg: '#EAEAEA', fg: '#222', label: '▲' },
  opencode: { bg: '#EDEDED', fg: '#333', label: '{}' },
  antigravity: { bg: '', fg: '', label: '/icons/antigravity.png' },
  vercel: { bg: '#111', fg: '#fff', label: '▲' },
  supabase: { bg: '', fg: '', label: '/icons/supabase.png' },
  github: { bg: '#EDEDED', fg: '#111', label: '⌥' },
  expo: { bg: '#ECECEC', fg: '#111', label: '⋀' },
  react: { bg: '#E2F6FB', fg: '#0A93B5', label: '⚛' },
  tailwind: { bg: '#E0F5FA', fg: '#0EA5C6', label: '≈' },
  nextjs: { bg: '#111', fg: '#fff', label: 'N' },
  generic: { bg: '#EAF4FB', fg: '#3B8FD9', label: '•' },
}

export function BrandBadge({ brand, className = 'size-6 text-[13px]' }: { brand: Brand; className?: string }) {
  const b = brands[brand] ?? brands.generic
  if (b.label.startsWith('/')) return <img src={b.label} alt="" aria-hidden className={`inline-block shrink-0 object-contain ${className}`} draggable={false} />
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-md font-semibold leading-none ${className}`}
      style={{ background: b.bg, color: b.fg }}
      aria-hidden
    >
      {b.label}
    </span>
  )
}
