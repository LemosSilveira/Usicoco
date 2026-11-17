/**
 * Dados da empresa. Tudo que não foi informado pelo cliente fica como
 * string vazia — os componentes que consomem este arquivo não renderizam
 * campos vazios. Não invente valores aqui (PRD, seção "Instruções").
 */

export interface SiteData {
  nome: string
  slogan: string
  /** Apenas dígitos, com DDI e DDD (ex.: "5585999998888"). Vazio = [PENDENTE]. */
  whatsapp: string
  email: string
  telefoneExibicao: string
  cidadeUf: string
  razaoSocial: string
  cnpj: string
  redesSociais: {
    instagram: string
    facebook: string
    linkedin: string
  }
}

export const site: SiteData = {
  nome: 'USICOCO',
  slogan: 'Reciclando Soluções',
  whatsapp: '', // [PENDENTE] briefing seção 6
  email: '', // [PENDENTE] briefing seção 6
  telefoneExibicao: '', // [PENDENTE] briefing seção 6
  cidadeUf: '', // [PENDENTE] briefing seção 6
  razaoSocial: '', // [PENDENTE] briefing item 2.5
  cnpj: '', // [PENDENTE] briefing item 2.5
  redesSociais: {
    instagram: '', // [PENDENTE]
    facebook: '', // [PENDENTE]
    linkedin: '', // [PENDENTE]
  },
}
