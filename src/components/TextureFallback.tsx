interface TextureFallbackProps {
  className?: string
}

/**
 * Textura de reserva para fotos ainda [PENDENTE] (PRD seção 3): gradiente
 * coco-900 → coco-500 com ruído via feTurbulence, para a página nunca
 * parecer quebrada.
 */
export function TextureFallback({ className = '' }: TextureFallbackProps) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br from-coco-900 to-coco-500 ${className}`}
      aria-hidden="true"
    >
      <svg className="h-full w-full opacity-30" preserveAspectRatio="none">
        <filter id="usicoco-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#usicoco-noise)" />
      </svg>
    </div>
  )
}
