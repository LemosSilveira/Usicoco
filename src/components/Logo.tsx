import { findAsset } from '../lib/assets'

const svgModules = import.meta.glob('../assets/logo/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

interface LogoProps {
  variant?: 'color' | 'white'
  className?: string
}

/**
 * Procura logo-usicoco.svg / logo-usicoco-branco.svg (PRD, nota do logo).
 * Enquanto esses arquivos não existirem, usa o fallback tipográfico —
 * nunca o PNG com cartão branco original.
 */
export function Logo({ variant = 'color', className = '' }: LogoProps) {
  const svgSrc = findAsset(svgModules, variant === 'white' ? 'logo-usicoco-branco.svg' : 'logo-usicoco.svg')

  if (svgSrc) {
    return (
      <img
        src={svgSrc}
        alt="USICOCO — Reciclando Soluções"
        className={className}
      />
    )
  }

  const isWhite = variant === 'white'
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span
        className={`font-display text-2xl ${isWhite ? 'text-white' : 'text-blue-500'}`}
        style={{ fontStretch: '125%' }}
      >
        USICOCO
      </span>
      <span
        className={`font-mono text-[11px] tracking-[0.08em] ${isWhite ? 'text-white/80' : 'text-coco-500'}`}
      >
        Reciclando Soluções
      </span>
    </div>
  )
}
