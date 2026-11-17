import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

interface ScrollingTextProps {
  text: string
  className?: string
}

/** A11 — faixa de texto com movimento inverso ligado ao scroll. */
export function ScrollingText({ text, className = '' }: ScrollingTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const xLinked = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])
  const x = shouldReduceMotion ? '0%' : xLinked

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <motion.span
        style={{
          x,
          fontSize: 'clamp(2rem, 7vw, 6rem)',
          WebkitTextStroke: '1px currentColor',
          color: 'transparent',
        }}
        className="inline-block font-display text-coco-500"
      >
        {text} {text}
      </motion.span>
    </div>
  )
}
