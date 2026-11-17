import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { machines } from '../data/machines'
import { productionLine } from '../data/content'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { MachinePanel } from '../components/MachinePanel'
import { ProcessLine } from '../components/ProcessLine'
import { SectionLabel } from '../components/SectionLabel'

const STEPS = machines.map((m) => m.processo)
const PANEL_COUNT = machines.length + 1

function Intro() {
  return (
    <>
      <SectionLabel className="text-coco-500">{productionLine.label}</SectionLabel>
      <h2 id="maquinas-titulo" className="mt-6 font-display text-blue-500">
        {productionLine.title}
      </h2>
      <p className="mt-4 text-coco-950/70" style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)' }}>
        {productionLine.subtitle}
      </p>
    </>
  )
}

/** A7 + A8 — rolagem horizontal fixada (≥1024px, ponteiro fino, sem reduced motion). */
function HorizontalProductionLine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  const x = useTransform(smoothProgress, [0, 1], ['0vw', `-${(PANEL_COUNT - 1) * 100}vw`])

  return (
    <div ref={containerRef} className="relative bg-coco-50" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          <div className="container-page flex h-full w-screen shrink-0 flex-col justify-center">
            <Intro />
          </div>

          {machines.map((machine) => (
            <div key={machine.id} className="container-page flex h-full w-screen shrink-0 items-center">
              <MachinePanel machine={machine} className="w-full" />
            </div>
          ))}
        </motion.div>

        <div className="container-page absolute inset-x-0 bottom-10">
          <ProcessLine steps={STEPS} orientation="horizontal" progress={smoothProgress} />
        </div>
      </div>
    </div>
  )
}

/** Pilha vertical (mobile/tablet, ou sem ponteiro fino, ou reduced motion). */
function VerticalProductionLine() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] })

  return (
    <div ref={sectionRef} className="bg-coco-50">
      <div className="container-page section-space">
        <Intro />

        <div className="mt-16 flex items-stretch gap-6 md:gap-12">
          <ProcessLine steps={STEPS} orientation="vertical" progress={scrollYProgress} className="pt-4" />

          <div className="flex flex-1 flex-col gap-20 md:gap-32">
            {machines.map((machine) => (
              <MachinePanel key={machine.id} machine={machine} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductionLine() {
  const isDesktop = useIsDesktop()
  const shouldReduceMotion = useReducedMotion()
  const horizontal = isDesktop && !shouldReduceMotion

  return (
    <section id="maquinas" aria-labelledby="maquinas-titulo" className="relative">
      {horizontal ? <HorizontalProductionLine /> : <VerticalProductionLine />}
    </section>
  )
}
