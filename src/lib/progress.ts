import { useSyncExternalStore } from 'react'

interface State {
  done: string[]
  last?: string
  name: string
}

const KEY = 'juvcc:v1'
const fallback: State = { done: [], name: 'Vibe coder' }

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<State>
    return { done: Array.isArray(parsed.done) ? parsed.done : [], last: parsed.last, name: parsed.name || fallback.name }
  } catch {
    return fallback
  }
}

let state: State = load()
const listeners = new Set<() => void>()

function set(next: State) {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage blocked: keep in memory */ }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const lessonKey = (course: string, lesson: string) => `${course}/${lesson}`

export function useProgress() {
  const s = useSyncExternalStore(subscribe, () => state, () => state)
  return {
    ...s,
    isDone: (k: string) => s.done.includes(k),
    toggle: (k: string) => set({ ...state, done: state.done.includes(k) ? state.done.filter((d) => d !== k) : [...state.done, k] }),
    markDone: (k: string) => { if (!state.done.includes(k)) set({ ...state, done: [...state.done, k] }) },
    visit: (k: string) => { if (state.last !== k) set({ ...state, last: k }) },
    setName: (name: string) => set({ ...state, name: name.trim().slice(0, 32) || fallback.name }),
    reset: () => set({ ...fallback }),
  }
}
