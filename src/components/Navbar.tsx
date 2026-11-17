import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { nav } from '../data/content'
import { smoothScrollTo } from '../hooks/useLenis'
import { hasWhatsapp, buildWhatsappUrl } from '../lib/whatsapp'
import { Button } from './Button'
import { Logo } from './Logo'

const ORCAMENTO_MESSAGE = 'Olá! Gostaria de solicitar um orçamento.'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M5 5l14 14M19 5L5 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)

    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 200) {
      setHidden(true)
    } else if (latest < previous) {
      setHidden(false)
    }
  })

  useEffect(() => {
    if (!menuOpen) return

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const orcamentoHref = hasWhatsapp ? buildWhatsappUrl(ORCAMENTO_MESSAGE) : '#contato'
  const solidBg = scrolled || menuOpen

  return (
    <motion.header
      animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solidBg ? 'bg-white/85 text-blue-500 backdrop-blur-md' : 'bg-transparent text-white'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#inicio" className="shrink-0" onClick={(e) => smoothScrollTo(e, '#inicio')}>
          <Logo variant={solidBg ? 'color' : 'white'} className="h-10 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 font-label md:flex" aria-label="Seções da página">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-70"
              onClick={(e) => smoothScrollTo(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={orcamentoHref} target={hasWhatsapp ? '_blank' : undefined} rel={hasWhatsapp ? 'noreferrer' : undefined}>
            Solicitar orçamento
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <div
          id="menu-mobile"
          ref={panelRef}
          className="fixed inset-0 top-20 flex flex-col gap-8 bg-coco-900 px-6 py-12 text-white md:hidden"
        >
          <nav className="flex flex-col gap-6 font-display text-4xl" aria-label="Seções da página">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  smoothScrollTo(e, item.href)
                  setMenuOpen(false)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button
            href={orcamentoHref}
            target={hasWhatsapp ? '_blank' : undefined}
            rel={hasWhatsapp ? 'noreferrer' : undefined}
            className="mt-auto w-full"
          >
            Solicitar orçamento
          </Button>
        </div>
      )}
    </motion.header>
  )
}
