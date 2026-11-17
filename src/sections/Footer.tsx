import { nav } from '../data/content'
import { site } from '../data/site'
import { smoothScrollTo } from '../hooks/useLenis'
import { Logo } from '../components/Logo'

const socialLinks = [
  { key: 'instagram', label: 'Instagram', href: site.redesSociais.instagram },
  { key: 'facebook', label: 'Facebook', href: site.redesSociais.facebook },
  { key: 'linkedin', label: 'LinkedIn', href: site.redesSociais.linkedin },
].filter((s) => s.href)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-blue-700 text-white">
      <div className="container-page section-space flex flex-col gap-12 !py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          {/* A Logo já traz "Reciclando Soluções" no fallback tipográfico (e deve trazer no SVG final). */}
          <Logo variant="white" className="h-10 w-auto" />

          <nav className="flex flex-wrap gap-6 font-label" aria-label="Seções da página">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-green-500"
                onClick={(e) => smoothScrollTo(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {socialLinks.length > 0 && (
            <div className="flex gap-6 font-label">
              {socialLinks.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noreferrer" className="hover:text-green-500">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 border-t border-white/15 pt-8 font-mono text-xs text-white/70">
          {site.razaoSocial && <p>{site.razaoSocial}</p>}
          {site.cnpj && <p>CNPJ: {site.cnpj}</p>}
          <p>
            © {year} {site.nome}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
