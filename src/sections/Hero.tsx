import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { hero } from '../data/content'
import { smoothScrollTo } from '../hooks/useLenis'
import { findAsset } from '../lib/assets'
import { Logo } from '../components/Logo'
import { TextureFallback } from '../components/TextureFallback'

const heroImages = import.meta.glob('../assets/hero/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const EASE = [0.22, 1, 0.36, 1] as const

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3v10m0 0L4 9m4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Hero() {
  const photoSrc = findAsset(heroImages, 'fibra-de-coco.webp')
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  const photoScaleLinked = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const photoYLinked = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const logoOpacityLinked = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const logoYLinked = useTransform(scrollYProgress, [0, 0.6], [0, -60])
  const overlayOpacityLinked = useTransform(scrollYProgress, [0, 1], [0.55, 0.8])

  const photoScale = shouldReduceMotion ? 1 : photoScaleLinked
  const photoY = shouldReduceMotion ? '0%' : photoYLinked
  const logoOpacity = shouldReduceMotion ? 1 : logoOpacityLinked
  const logoYMotion = shouldReduceMotion ? 0 : logoYLinked
  const overlayOpacity = shouldReduceMotion ? 0.55 : overlayOpacityLinked

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-coco-900"
    >
      <h1 className="sr-only-focusable absolute">{hero.h1Oculto}</h1>

      <div className="absolute inset-0">
        <motion.div className="absolute inset-0" style={{ scale: photoScale, y: photoY }}>
          {photoSrc ? (
            <img
              src={photoSrc}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <TextureFallback />
          )}
        </motion.div>
        <motion.div className="absolute inset-0 bg-coco-950" style={{ opacity: overlayOpacity }} aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coco-950/60 to-transparent"
          aria-hidden="true"
        />
      </div>

      <motion.div style={{ opacity: logoOpacity, y: logoYMotion }} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <a href="#inicio" onClick={(e) => smoothScrollTo(e, '#inicio')}>
            <Logo variant="white" />
          </a>
        </motion.div>
      </motion.div>

      {hero.cornerTopLeft && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0, ease: EASE }}
          className="absolute left-6 top-24 hidden font-label text-white md:block"
        >
          {hero.cornerTopLeft}
        </motion.span>
      )}
      {hero.cornerTopRight && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          className="absolute right-6 top-24 hidden font-label text-white md:block"
        >
          {hero.cornerTopRight}
        </motion.span>
      )}

      <div className="absolute inset-x-6 bottom-8 flex flex-col items-start gap-1 font-label text-white sm:flex-row sm:items-end sm:justify-between">
        {hero.cornerBottomLeft && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
          >
            {hero.cornerBottomLeft}
          </motion.span>
        )}
        {hero.cornerBottomRight && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
          >
            {hero.cornerBottomRight}
          </motion.span>
        )}
      </div>

      <a
        href="#sobre"
        onClick={(e) => smoothScrollTo(e, '#sobre')}
        className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/60 px-4 py-2 font-label text-white transition-colors hover:bg-white/10"
      >
        {hero.scrollCue}
        <motion.span
          animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown />
        </motion.span>
      </a>
    </section>
  )
}
