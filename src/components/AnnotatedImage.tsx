import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { HuskAnnotation } from '../data/content'
import { TextureFallback } from './TextureFallback'

interface AnnotatedImageProps {
  src?: string
  alt: string
  annotations: HuskAnnotation[]
  className?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Foto com anotações estilo referência (PRD 5.3, A6): a foto revela de
 * dentro para fora via clip-path ligado ao scroll; depois as linhas da
 * anotação se desenham (pathLength) e os rótulos aparecem.
 */
export function AnnotatedImage({ src, alt, annotations, className = '' }: AnnotatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  })

  const clipPathLinked = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)'],
  )
  const clipPath = shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : clipPathLinked

  return (
    <div ref={containerRef} className={`relative aspect-[4/5] overflow-hidden rounded-card ${className}`}>
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          <TextureFallback />
        )}
      </motion.div>

      <svg
        className="absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {annotations.map((a, i) => (
          <g key={a.label}>
            <circle
              cx={a.x}
              cy={a.y}
              r="3"
              fill="none"
              stroke="white"
              strokeWidth="0.3"
              strokeDasharray="1.5 1.5"
            />
            <motion.line
              x1={a.x}
              y1={a.y}
              x2={Math.min(96, a.x + 14)}
              y2={Math.max(4, a.y - 10)}
              stroke="white"
              strokeWidth="0.3"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
              whileInView={shouldReduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
            />
          </g>
        ))}
      </svg>

      {annotations.map((a, i) => (
        <motion.span
          key={a.label}
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.15 + 0.3, ease: EASE }}
          className="absolute hidden -translate-y-full font-label text-white md:block"
          style={{ left: `${Math.min(96, a.x + 14)}%`, top: `${Math.max(4, a.y - 10)}%` }}
        >
          {a.label}
        </motion.span>
      ))}
    </div>
  )
}
