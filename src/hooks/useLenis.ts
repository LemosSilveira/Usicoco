import Lenis from 'lenis'
import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import { useIsDesktop } from './useIsDesktop'

let activeLenis: Lenis | null = null

/**
 * Lenis só em desktop com mouse e fora de prefers-reduced-motion (PRD seção 6).
 * Monta uma única vez, na raiz do app.
 */
export function useLenis() {
  const isDesktop = useIsDesktop()
  const reducedMotion = useReducedMotion()
  const enabled = isDesktop && !reducedMotion

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({ lerp: 0.1 })
    activeLenis = lenis

    let frameId: number
    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      activeLenis = null
    }
  }, [enabled])
}

/** Usado pelos links âncora da navbar; cai para o scroll nativo fora do desktop. */
export function scrollToHash(hash: string) {
  if (activeLenis) {
    activeLenis.scrollTo(hash)
    return
  }
  document.querySelector(hash)?.scrollIntoView({ block: 'start' })
}

/** Handler de clique para links internos: rola (via Lenis quando ativo) e mantém a URL em sincronia. */
export function smoothScrollTo(event: MouseEvent<HTMLAnchorElement>, hash: string) {
  event.preventDefault()
  scrollToHash(hash)
  history.pushState(null, '', hash)
}
