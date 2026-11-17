import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import type { Product } from '../data/products'

const EASE = [0.22, 1, 0.36, 1] as const

interface ProductCardProps {
  product: Product
  delay: number
}

/**
 * A10 — entrada escalonada: clip-path de baixo para cima, sem scale (fotos
 * pequenas, PRD 5.5/6). O `useInView` observa o wrapper (sem clip-path);
 * o clip-path anima na foto. Observar o próprio elemento clipado faria o
 * Chrome medir sua razão de interseção como 0 mesmo sobrepondo a viewport,
 * travando a revelação (a mesma armadilha corrigida no título do Contato).
 */
export function ProductCard({ product, delay }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="mx-auto flex w-full max-w-[480px] flex-col gap-4">
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 0.7, delay, ease: EASE }}
        className="relative aspect-[4/3] overflow-hidden rounded-card bg-coco-50"
      >
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: product.objectPosition }}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div>
        <p
          className="font-display text-coco-950"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
        >
          {product.name}
        </p>
        <p className="mt-1 font-label text-coco-500">{product.source}</p>
      </div>
    </div>
  )
}
