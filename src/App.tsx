import { MotionConfig } from 'motion/react'
import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { useLenis } from './hooks/useLenis'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Husk } from './sections/Husk'
import { ProductionLine } from './sections/ProductionLine'
import { Products } from './sections/Products'

function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-green-700 px-4 py-2 text-white"
      >
        Pular para o conteúdo
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="conteudo">
        <Hero />
        <About />
        <Husk />
        <ProductionLine />
        <Products />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}

export default App
