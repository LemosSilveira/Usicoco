import { motion } from 'motion/react'
import { products } from '../data/content'
import { findAsset } from '../lib/assets'
import { ScrollingText } from '../components/ScrollingText'
import { SectionLabel } from '../components/SectionLabel'
import { TextureFallback } from '../components/TextureFallback'

const productImages = import.meta.glob('../assets/produtos/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const EASE = [0.22, 1, 0.36, 1] as const
const VIEWPORT = { once: true, amount: 0.3 } as const

export function Products() {
  return (
    <section id="produtos" aria-labelledby="produtos-titulo" className="section-space bg-white">
      <div className="container-page">
        <SectionLabel className="text-coco-500">{products.label}</SectionLabel>
        <h2 id="produtos-titulo" className="mt-6 font-display text-blue-500">
          {products.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {products.items.map((item, i) => {
            const photoSrc = item.image ? findAsset(productImages, item.image) : undefined
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-card">
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <TextureFallback />
                  )}
                </div>
                <div>
                  <p className="font-display text-xl text-coco-950" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                    {item.name}
                  </p>
                  <p className="mt-1 font-label text-coco-500">{item.origem}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <ScrollingText text={products.scrollingText} className="mt-20" />
      </div>
    </section>
  )
}
