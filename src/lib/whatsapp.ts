import { site } from '../data/site'

export function buildWhatsappUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${site.whatsapp}?text=${encoded}`
}

export function quoteMessage(machineName: string): string {
  return `Olá! Gostaria de um orçamento do(a) ${machineName}.`
}

export const hasWhatsapp = site.whatsapp.length > 0
