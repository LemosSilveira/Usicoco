/**
 * Localiza um asset opcional dentro do resultado de um import.meta.glob
 * (chamado no módulo que consome esta função, já que o Vite precisa do
 * literal do padrão ali). Usado para fotos marcadas [PENDENTE] no PRD:
 * enquanto o arquivo não existe, o chamador usa TextureFallback.
 */
export function findAsset(
  modules: Record<string, string>,
  filename: string,
): string | undefined {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(filename))
  return entry?.[1]
}
