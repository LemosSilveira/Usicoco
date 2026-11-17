import classificadorDeFibras from '../assets/maquinas/classificador-de-fibras.webp'
import desfibradorDeCascas from '../assets/maquinas/desfibrador-de-cascas.webp'
import peneiraRotativa from '../assets/maquinas/peneira-rotativa.webp'
import prensaEnfardadeira from '../assets/maquinas/prensa-enfardadeira.webp'

export interface Machine {
  id: string
  number: string
  name: string
  processo: string
  description: string
  input: string
  output: string
  image: string
  imageWidth: number
  imageHeight: number
  alt: string
}

export const machines: Machine[] = [
  {
    id: 'desfibrador',
    number: '01',
    name: 'Desfibrador de Cascas',
    processo: 'Desfibrar',
    description:
      'O Desfibrador de Cascas é um equipamento destinado a dilacerar as cascas de coco seco a fim de produzir o Pó da Casca de Coco e a fibra de Coco.',
    input: 'Casca de coco seco',
    output: 'Pó da casca + fibra',
    image: desfibradorDeCascas,
    imageWidth: 1309,
    imageHeight: 1600,
    alt: 'Desfibrador de cascas de coco Usicoco, azul, com motor elétrico lateral',
  },
  {
    id: 'classificador',
    number: '02',
    name: 'Classificador de Fibras de Coco',
    processo: 'Classificar',
    description:
      'O Classificador de Fibras de Coco é usado para melhorar a qualidade de fibras produzidas pelo Desfibrador, retirando o pó e grumos remanescentes do processo anterior.',
    input: 'Fibra do desfibrador',
    output: 'Fibra limpa',
    image: classificadorDeFibras,
    imageWidth: 1273,
    imageHeight: 1536,
    alt: 'Classificador de fibras de coco Usicoco, estrutura azul com tambor rotativo',
  },
  {
    id: 'peneira',
    number: '03',
    name: 'Peneira Rotativa',
    processo: 'Peneirar',
    description:
      'A Peneira Rotativa separa o pó de coco mais fino dos restos de fibra e outros elementos gerados no processo de extração, gerando um Pó Peneirado de alta qualidade.',
    input: 'Pó com restos de fibra',
    output: 'Pó peneirado',
    image: peneiraRotativa,
    imageWidth: 1600,
    imageHeight: 1553,
    alt: 'Peneira rotativa Usicoco, tambor cilíndrico azul com tela de classificação',
  },
  {
    id: 'prensa',
    number: '04',
    name: 'Prensa Enfardadeira',
    processo: 'Prensar',
    description:
      'A Prensa Enfardadeira é usada para prensar as fibras de coco, gerando fardos de aproximadamente 90Kg.',
    input: 'Fibra de coco',
    output: 'Fardos de ~90 kg',
    image: prensaEnfardadeira,
    imageWidth: 1042,
    imageHeight: 1600,
    alt: 'Prensa enfardadeira Usicoco, azul e amarela, formato vertical',
  },
]
