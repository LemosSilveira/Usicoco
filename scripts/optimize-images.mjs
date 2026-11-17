// Converte os PNG de origem (PRD seção 3) para os WebP consumidos pelo site.
// Fontes: C:\Users\Usuario\Downloads (logo + máquinas) e
// C:\Users\Usuario\Desktop\imagens_usicoco (hero + produtos).
import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS = path.resolve(__dirname, '..', 'src', 'assets')
const DOWNLOADS = 'C:/Users/Usuario/Downloads'
const IMAGENS = 'C:/Users/Usuario/Desktop/imagens_usicoco'

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function processMachine(srcName, destName) {
  const src = path.join(DOWNLOADS, srcName)
  const dest = path.join(ASSETS, 'maquinas', destName)
  // PRD pede lado maior de 1600px, mas isso mede 2-3x o que a máquina
  // realmente ocupa em tela (painel desktop ~650px, pilha mobile ~420px) e
  // reprovava o Lighthouse móvel (meta de performance da seção 7). 1200px
  // ainda cobre retina nesses tamanhos de exibição com bem menos payload.
  await sharp(src)
    .trim()
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest)
  console.log('ok ->', dest)
}

async function main() {
  await ensureDir(path.join(ASSETS, 'logo'))
  await ensureDir(path.join(ASSETS, 'maquinas'))
  await ensureDir(path.join(ASSETS, 'hero'))
  await ensureDir(path.join(ASSETS, 'produtos'))

  // 3.1 — logo e máquinas
  await copyFile(path.join(DOWNLOADS, 'logo usicoco.png'), path.join(ASSETS, 'logo', 'logo-usicoco.png'))
  console.log('ok ->', path.join(ASSETS, 'logo', 'logo-usicoco.png'))

  await processMachine('DESFIBRADOR DE CASCAS.png', 'desfibrador-de-cascas.webp')
  await processMachine('CLASSIFICADOR DE FIBRAS.png', 'classificador-de-fibras.webp')
  await processMachine('PENEIRA ROTATIVA.png', 'peneira-rotativa.webp')
  await processMachine('PRENSA ENFARDADEIRA.png', 'prensa-enfardadeira.webp')

  // 3.2 — hero e produtos (fotos pequenas: nunca ampliar)
  await sharp(path.join(IMAGENS, 'fundo_hero.png'))
    .webp({ quality: 85 })
    .toFile(path.join(ASSETS, 'hero', 'fibra-de-coco.webp'))
  console.log('ok ->', path.join(ASSETS, 'hero', 'fibra-de-coco.webp'))

  await sharp(path.join(IMAGENS, 'fibradecoco.png'))
    .flatten({ background: '#ffffff' })
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS, 'produtos', 'fibra.webp'))
  console.log('ok ->', path.join(ASSETS, 'produtos', 'fibra.webp'))

  await sharp(path.join(IMAGENS, 'podacasca.png'))
    .trim()
    .flatten({ background: '#ffffff' })
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS, 'produtos', 'po.webp'))
  console.log('ok ->', path.join(ASSETS, 'produtos', 'po.webp'))

  await sharp(path.join(IMAGENS, 'pó_peneirado.png'))
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS, 'produtos', 'po-peneirado.webp'))
  console.log('ok ->', path.join(ASSETS, 'produtos', 'po-peneirado.webp'))

  await sharp(path.join(IMAGENS, 'fardos_90kg.png'))
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS, 'produtos', 'fardo.webp'))
  console.log('ok ->', path.join(ASSETS, 'produtos', 'fardo.webp'))
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
