import { motion, useScroll, useSpring } from 'motion/react'

/** A1 — barra de progresso de scroll, acima da navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-green-500"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
