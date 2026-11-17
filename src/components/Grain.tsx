import { useId } from 'react'

interface GrainProps {
  className?: string
}

/**
 * Camada de ruído (PRD seção 4.3): feTurbulence a 8% de opacidade com
 * mix-blend-mode overlay, usada sobre o hero e o fundo do Contato.
 */
export function Grain({ className = '' }: GrainProps) {
  const filterId = `usicoco-grain-${useId()}`

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  )
}
