import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

interface WordRevealProps {
  text: string
  /** Substrings exatas do texto (podem ter mais de uma palavra) que recebem destaque verde. */
  highlights?: string[]
  highlightClassName?: string
  className?: string
}

function stripTrailingPunctuation(word: string): string {
  return word.replace(/[.,!?;:"')\]]+$/, '')
}

function buildHighlightMask(words: string[], highlights: string[]): boolean[] {
  const mask = new Array(words.length).fill(false)

  for (const phrase of highlights) {
    const phraseWords = phrase.split(/\s+/)
    for (let start = 0; start <= words.length - phraseWords.length; start++) {
      let matches = true
      for (let j = 0; j < phraseWords.length; j++) {
        const candidate = stripTrailingPunctuation(words[start + j])
        if (candidate !== phraseWords[j]) {
          matches = false
          break
        }
      }
      if (matches) {
        for (let j = 0; j < phraseWords.length; j++) mask[start + j] = true
        break
      }
    }
  }

  return mask
}

interface WordProps {
  word: string
  highlighted: boolean
  highlightClassName: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  reduced: boolean
}

function Word({ word, highlighted, highlightClassName, index, total, scrollYProgress, reduced }: WordProps) {
  const start = index / total
  const end = (index + 1) / total
  const opacityLinked = useTransform(scrollYProgress, [start, end], [0.15, 1])
  const opacity = reduced ? 1 : opacityLinked

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity }}
      className={highlighted ? highlightClassName : undefined}
    >
      {word}{' '}
    </motion.span>
  )
}

/** A5 — revelação palavra a palavra ligada ao scroll (PRD seção 6). */
export function WordReveal({ text, highlights = [], highlightClassName = 'text-green-500', className = '' }: WordRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const words = text.split(/\s+/)
  const mask = buildHighlightMask(words, highlights)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.45'],
  })

  return (
    <p ref={containerRef} aria-label={text} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          highlighted={mask[i]}
          highlightClassName={highlightClassName}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
          reduced={!!shouldReduceMotion}
        />
      ))}
    </p>
  )
}
