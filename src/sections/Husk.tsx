import { husk } from '../data/content'
import { findAsset } from '../lib/assets'
import { AnnotatedImage } from '../components/AnnotatedImage'
import { SectionLabel } from '../components/SectionLabel'
import { Tag } from '../components/Tag'

const huskImages = import.meta.glob('../assets/casca/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function Husk() {
  const photoSrc = findAsset(huskImages, 'coco-cortado.webp')

  return (
    <section id="casca" aria-labelledby="casca-titulo" className="section-space bg-coco-900 text-white">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <AnnotatedImage
            src={photoSrc}
            alt="Coco seco cortado ao meio, mostrando o mesocarpo"
            annotations={husk.annotations}
          />

          <ul className="mt-6 flex flex-wrap gap-3 md:hidden">
            {husk.annotations.map((a) => (
              <li key={a.label}>
                <Tag value={a.label} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-6 md:col-span-5 md:justify-center">
          <SectionLabel className="text-coco-500">{husk.label}</SectionLabel>
          <h2 id="casca-titulo" className="font-display">
            {husk.title}
          </h2>
          <p className="text-white/80">{husk.text}</p>
        </div>
      </div>
    </section>
  )
}
