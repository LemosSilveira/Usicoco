/**
 * Textos das seções e dados de conteúdo que não são específicos de uma
 * máquina. Textos entre aspas no PRD (seção 5) são do cliente e devem
 * permanecer idênticos; os marcados (sugestão) podem ser ajustados depois
 * de aprovados.
 */

export const hero = {
  cornerTopLeft: 'USICOCO',
  cornerTopRight: 'Máquinas para casca de coco',
  cornerBottomLeft: '', // [PENDENTE: cidade — UF]
  cornerBottomRight: 'Reciclando Soluções',
  scrollCue: 'Role para conhecer',
  h1Oculto: 'USICOCO — máquinas para processamento de cascas de coco',
}

export const about = {
  label: '01 — SOBRE A USICOCO',
  manifesto:
    'A USICOCO é especializada na fabricação de máquinas de ponta para processamento de cascas de coco. Com tecnologia avançada e inovação constante, nossas máquinas são projetadas para extrair o máximo valor das cascas de coco, transformando-as em produtos úteis e sustentáveis.',
  destaques: ['máquinas de ponta', 'produtos úteis e sustentáveis'],
}

export interface HuskAnnotation {
  label: string
  x: number
  y: number
}

export const husk = {
  label: '02 — A MATÉRIA-PRIMA',
  title: 'Casca de coco',
  text: 'É chamado casca de coco a parte esponjosa da casca, o nome científico é mesocarpo, mas também é conhecida como “bucha” ou “busca”.',
  annotations: [
    { label: 'Mesocarpo', x: 50, y: 22 },
    { label: 'Bucha', x: 78, y: 48 },
    { label: 'Parte esponjosa da casca', x: 38, y: 72 },
  ] satisfies HuskAnnotation[],
}

export const productionLine = {
  label: '03 — AS MÁQUINAS',
  title: 'Da casca ao fardo',
  subtitle: 'Quatro máquinas, uma linha de produção.',
  ctaMaquina: 'Solicitar orçamento desta máquina',
}

export interface Product {
  id: string
  name: string
  origem: string
  /** Caminho da foto do produto; vazio enquanto [PENDENTE] (ver PRD seção 3/10) — usa TextureFallback. */
  image: string
}

export const products = {
  label: '04 — O QUE SAI DA LINHA',
  title: 'O que a casca vira',
  scrollingText: 'DESFIBRAR — CLASSIFICAR — PENEIRAR — PRENSAR —',
  items: [
    { id: 'fibra', name: 'Fibra de coco', origem: 'Desfibrador + Classificador', image: 'fibra.webp' },
    { id: 'po', name: 'Pó da casca de coco', origem: 'Desfibrador', image: 'po.webp' },
    { id: 'po-peneirado', name: 'Pó peneirado', origem: 'Peneira Rotativa', image: 'po-peneirado.webp' },
    { id: 'fardo', name: 'Fardos de ~90 kg', origem: 'Prensa Enfardadeira', image: 'fardo.webp' },
  ] satisfies Product[],
}

export const contact = {
  title: 'Vamos transformar casca em valor?',
  /** Mesmo texto de `title`, quebrado para a revelação linha a linha (A12). */
  titleLines: ['Vamos transformar', 'casca em valor?'],
  ctaWhatsapp: 'Falar no WhatsApp',
}

export const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#casca', label: 'A casca' },
  { href: '#maquinas', label: 'Máquinas' },
  { href: '#produtos', label: 'Produtos' },
]
