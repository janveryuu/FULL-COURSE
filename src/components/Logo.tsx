/**
 * "Pixel" — the course mascot. An original pixel robot drawn on a 16x14 grid.
 * B = body, W = eye/white, D = dark detail, A = antenna light
 */
const ART = [
  '.......A........',
  '.......B........',
  '...BBBBBBBBBB...',
  '..BBBBBBBBBBBB..',
  '.BBBBBBBBBBBBBB.',
  'BBBWWWBBBBWWWBBB',
  'BBBWDWBBBBWDWBBB',
  'BBBWWWBBBBWWWBBB',
  '.BBBBBBBBBBBBBB.',
  '.BBBBBDDDDBBBBB.',
  '..BBBBBBBBBBBB..',
  '...BBB....BBB...',
  '...BBB....BBB...',
]


export function PixelBot({ className = 'h-8 w-auto', blink = false, color = 'var(--color-brand)', eye = '#fff' }: { className?: string; blink?: boolean; color?: string; eye?: string }) {
  const COLORS: Record<string, string> = { B: color, W: eye, D: '#1F4E7A', A: '#FFB547' }
  const rects: { x: number; y: number; c: string; eye: boolean }[] = []
  ART.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== '.') rects.push({ x, y, c: COLORS[ch], eye: ch === 'W' || ch === 'D' })
    }),
  )
  return (
    <svg viewBox="0 0 16 13" className={className} shapeRendering="crispEdges" aria-hidden>
      {rects.filter((r) => !r.eye).map((r) => <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width="1.02" height="1.02" fill={r.c} />)}
      <g className={blink ? 'animate-blink' : undefined} style={{ transformOrigin: '8px 6.5px', transformBox: 'view-box' }}>
        {rects.filter((r) => r.eye).map((r) => <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width="1.02" height="1.02" fill={r.c} />)}
      </g>
    </svg>
  )
}

/** Blocky pixel cloud used as decoration. */
export function PixelCloud({ className = 'w-24', color = 'var(--color-brand)' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 12 5" className={className} shapeRendering="crispEdges" aria-hidden>
      <rect x="4" y="0" width="4" height="1" fill={color} />
      <rect x="2" y="1" width="8" height="1" fill={color} />
      <rect x="1" y="2" width="11" height="1" fill={color} />
      <rect x="0" y="3" width="12" height="2" fill={color} />
    </svg>
  )
}

export function Wordmark({ sub = 'Ultimate Vibe Coding Course' }: { sub?: string }) {
  return (
    <span className="flex items-center gap-3">
      <PixelBot className="h-8 w-auto shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-semibold tracking-tight text-ink">Janver</span>
        <span className="text-xs text-muted">{sub}</span>
      </span>
    </span>
  )
}
