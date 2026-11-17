import { productsSection } from '../data/content'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { ScrollingText } from '../components/ScrollingText'
import { SectionLabel } from '../components/SectionLabel'

export function Products() {
  return (
    <section id="produtos" aria-labelledby="produtos-titulo" className="section-space bg-white">
      <div className="container-page">
        <SectionLabel className="text-coco-500">{productsSection.label}</SectionLabel>
        <h2 id="produtos-titulo" className="mt-6 font-display text-blue-500">
          {productsSection.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 0.1} />
          ))}
        </div>

        <ScrollingText text={productsSection.scrollingText} className="mt-20" />
      </div>
    </section>
  )
}
