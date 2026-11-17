import type { MotionValue } from 'motion/react'
import { motion, useTransform } from 'motion/react'

interface ProcessLineProps {
  steps: string[]
  /** 0 a 1, ligado ao scroll (A8). Aceita número estático ou MotionValue. */
  progress: MotionValue<number> | number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function Node({
  step,
  threshold,
  progress,
}: {
  step: string
  threshold: number
  progress: MotionValue<number> | number
}) {
  const litLinked = useTransform(() =>
    (typeof progress === 'number' ? progress : progress.get()) >= threshold ? 1 : 0,
  )

  return (
    <div className="relative flex items-center gap-3">
      <span className="relative z-10 block h-2.5 w-2.5 rounded-full border-2 border-coco-950/30 bg-coco-50" aria-hidden="true">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-green-500 bg-green-500 transition-opacity duration-300"
          style={{ opacity: litLinked }}
        />
      </span>
      <span className="font-label text-coco-950/80">{step}</span>
    </div>
  )
}

export function ProcessLine({ steps, progress, orientation = 'vertical', className = '' }: ProcessLineProps) {
  const isVertical = orientation === 'vertical'
  const scale = useTransform(() => (typeof progress === 'number' ? progress : progress.get()))

  return (
    <div
      className={`relative flex ${isVertical ? 'h-full flex-col gap-10' : 'w-full flex-row items-center gap-0'} ${className}`}
      role="list"
      aria-label="Etapas da linha de produção"
    >
      <div
        className={`absolute bg-coco-950/15 ${isVertical ? 'left-[5px] top-0 h-full w-0.5' : 'left-0 top-[5px] h-0.5 w-full'}`}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 bg-green-500"
          style={
            isVertical
              ? { originY: 0, scaleY: scale }
              : { originX: 0, scaleX: scale }
          }
        />
      </div>

      {steps.map((step, i) => (
        <div key={step} role="listitem" className={isVertical ? '' : 'flex-1'}>
          <Node step={step} threshold={(i + 1) / (steps.length + 1)} progress={progress} />
        </div>
      ))}
    </div>
  )
}
