import { motion } from 'motion/react'
import type { Machine } from '../data/machines'
import { productionLine } from '../data/content'
import { buildWhatsappUrl, hasWhatsapp, quoteMessage } from '../lib/whatsapp'
import { Button } from './Button'
import { Tag } from './Tag'

interface MachinePanelProps {
  machine: Machine
  className?: string
}

const EASE = [0.22, 1, 0.36, 1] as const
const VIEWPORT = { once: true, amount: 0.4 } as const

/** A9 — entrada no viewport: foto escala + fade, textos sobem em sequência. */
export function MachinePanel({ machine, className = '' }: MachinePanelProps) {
  const quoteHref = hasWhatsapp ? buildWhatsappUrl(quoteMessage(machine.name)) : '#contato'

  return (
    <article
      className={`relative grid grid-cols-1 items-center gap-10 overflow-hidden md:grid-cols-2 md:gap-16 ${className}`}
      aria-labelledby={`maquina-${machine.id}`}
    >
      <span
        className="pointer-events-none absolute -left-4 -top-10 select-none font-display text-[10rem] leading-none text-coco-500/15 md:text-[16rem]"
        aria-hidden="true"
      >
        {machine.number}
      </span>

      <div className="relative z-10 flex min-w-0 flex-col items-start gap-5">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0, ease: EASE }}
          className="font-label text-coco-500"
        >
          {machine.number}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          id={`maquina-${machine.id}`}
          className="w-full min-w-0 break-words font-display text-blue-500"
          style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)' }}
        >
          {machine.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
          className="text-coco-950/80"
        >
          {machine.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
          className="flex flex-wrap gap-3"
        >
          <Tag label="Entra" value={machine.input} />
          <Tag label="Sai" value={machine.output} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
        >
          <Button
            variant="ghost"
            href={quoteHref}
            target={hasWhatsapp ? '_blank' : undefined}
            rel={hasWhatsapp ? 'noreferrer' : undefined}
            className="mt-2"
          >
            {productionLine.ctaMaquina}
          </Button>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative"
        >
          <img
            src={machine.image}
            width={machine.imageWidth}
            height={machine.imageHeight}
            alt={machine.alt}
            loading="lazy"
            decoding="async"
            className="max-h-[50vh] w-auto object-contain md:max-h-[70vh]"
          />
          <span
            className="absolute -bottom-2 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-full bg-coco-950/20 blur-xl"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </article>
  )
}
