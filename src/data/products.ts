import fardo from '../assets/produtos/fardo.webp'
import fibra from '../assets/produtos/fibra.webp'
import po from '../assets/produtos/po.webp'
import poPeneirado from '../assets/produtos/po-peneirado.webp'

export interface Product {
  id: string
  name: string
  source: string
  image: string
  alt: string
  objectPosition: string
}

export const products: Product[] = [
  {
    id: 'fibra',
    name: 'Fibra de coco',
    source: 'Desfibrador + Classificador',
    image: fibra,
    alt: 'Mãos segurando fibra de coco dourada',
    objectPosition: 'center',
  },
  {
    id: 'po',
    name: 'Pó da casca de coco',
    source: 'Desfibrador',
    image: po,
    alt: 'Mão aberta sobre pó da casca de coco',
    objectPosition: 'center 60%',
  },
  {
    id: 'po-peneirado',
    name: 'Pó peneirado',
    source: 'Peneira Rotativa',
    image: poPeneirado,
    alt: 'Pó de coco peneirado dentro de um saco plástico',
    objectPosition: 'center',
  },
  {
    id: 'fardo',
    name: 'Fardos de ~90 kg',
    source: 'Prensa Enfardadeira',
    image: fardo,
    alt: 'Fileiras de fardos de fibra de coco prensada',
    objectPosition: 'center 70%',
  },
]
