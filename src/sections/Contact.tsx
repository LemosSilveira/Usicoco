import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import heroPhoto from '../assets/hero/fibra-de-coco.webp'
import { contact } from '../data/content'
import { site } from '../data/site'
import { buildWhatsappUrl, hasWhatsapp, quoteMessage } from '../lib/whatsapp'
import { Button } from '../components/Button'
import { Grain } from '../components/Grain'

const EASE = [0.22, 1, 0.36, 1] as const

export function Contact() {
  const whatsappHref = hasWhatsapp ? buildWhatsappUrl(quoteMessage('')) : undefined
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.6 })

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="section-space relative overflow-hidden bg-coco-900 text-white">
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <img src={heroPhoto} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <Grain />

      <div className="container-page relative flex flex-col items-start gap-10">
        <h2 id="contato-titulo" ref={titleRef} className="font-display">
          {contact.titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={titleInView ? { y: '0%' } : undefined}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="flex flex-wrap items-center gap-8">
          <Button
            href={whatsappHref ?? '#contato'}
            target={hasWhatsapp ? '_blank' : undefined}
            rel={hasWhatsapp ? 'noreferrer' : undefined}
            className="min-h-14 px-8 text-sm"
          >
            {contact.ctaWhatsapp}
          </Button>

          <div className="flex flex-col gap-1 font-label">
            {site.email && (
              <a href={`mailto:${site.email}`} className="hover:text-green-500">
                {site.email}
              </a>
            )}
            {site.telefoneExibicao && (
              <a href={`tel:${site.telefoneExibicao}`} className="hover:text-green-500">
                {site.telefoneExibicao}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
