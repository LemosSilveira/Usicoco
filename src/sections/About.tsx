import { about } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { WordReveal } from '../components/WordReveal'

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-label" className="section-space bg-white">
      <div className="container-page">
        <SectionLabel className="text-coco-500">{about.label}</SectionLabel>
        <h2 id="sobre-label" className="sr-only-focusable absolute">
          Sobre a Usicoco
        </h2>
        <WordReveal
          text={about.manifesto}
          highlights={about.destaques}
          className="mt-10 max-w-none text-[clamp(1.5rem,3.2vw,3rem)] leading-[1.3] text-blue-500 md:w-10/12"
        />
      </div>
    </section>
  )
}
