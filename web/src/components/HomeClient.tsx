'use client'

import Link from 'next/link'
import { icons } from './Icons'
import { urlFor } from '@/lib/sanity'

interface HeroData {
  destacadoImagen?: {
    asset?: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } }
    hotspot?: any
  }
  destacadoDocumento?: {
    _id: string
    titulo: string
    slug: { current: string }
    descripcion?: string
    destacadoVolanta?: string
    destacadoTitulo?: string
    destacadoBajada?: string
    destacadoRefAutor?: string
    destacadoRefObra?: string
    destacadoRefAnio?: string
    destacadoRefPaginas?: string
    imagenPortada?: {
      asset?: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } }
    }
    archivos?: Array<{
      asset?: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number }; mimeType?: string } }
    }>
  }
}

interface HomeClientProps {
  counts: { documentos: number; narrativas: number; actores: number }
  hero: HeroData | null
}

const sections = [
  {
    href: '/catalogo',
    title: 'Archivo',
    desc: 'Explorá los documentos por región, período, tipo o tema. Filtros cruzados para investigadores.',
    icon: 'archivo',
    headerClass: 'light-primary',
  },
  {
    href: '/instituciones',
    title: 'Instituciones',
    desc: 'Instituciones que alojan material de archivo del norte santafesino.',
    icon: 'instituciones',
    headerClass: 'dark-primary',
  },
  {
    href: '/pueblos',
    title: 'Pueblos',
    desc: 'Comunidades y pueblos del norte de Santa Fe: su historia, su territorio, su memoria.',
    icon: 'pueblos',
    headerClass: 'light-primary',
  },
  {
    href: '/actores',
    title: 'Actores',
    desc: 'Empresas, sindicatos, fuerzas represivas, investigadores. Quiénes son y qué roles cumplieron.',
    icon: 'actores',
    headerClass: 'dark-primary',
  },
  {
    href: '/mapa',
    title: 'Mapa',
    desc: 'Explorá el territorio del norte santafesino. Localidades, regiones, sitios de memoria.',
    icon: 'mapa',
    headerClass: 'light-primary',
  },
  {
    href: '/historia-oral',
    title: 'Historia Oral',
    desc: 'Testimonios y tradiciones orales que transmiten la memoria viva de las comunidades.',
    icon: 'historia-oral',
    headerClass: 'dark-primary',
  },
  {
    href: '/tiempo',
    title: 'Tiempo',
    desc: 'Cronología y líneas de tiempo de los procesos históricos del norte santafesino.',
    icon: 'tiempo',
    headerClass: 'light-primary',
  },
  {
    href: '/objetos',
    title: 'Objetos',
    desc: 'Objetos materiales que cuentan la historia: herramientas, documentos, fotografías.',
    icon: 'objetos',
    headerClass: 'dark-primary',
  },
]

/* Resolve hero image URL — priority: destacadoImagen (siteSettings, color-treated) > imagenPortada > first image in archivos > first PDF */
function getHeroImageUrl(hero: HeroData): string | null {
  // 1. Custom destacadoImagen from siteSettings (color-treated, HIGHEST priority)
  if (hero.destacadoImagen?.asset?.url) {
    return urlFor(hero.destacadoImagen).width(900).height(1260).fit('crop').crop('top').url()
  }
  const doc = hero.destacadoDocumento
  // 2. imagenPortada from the document (curated thumbnail)
  if (doc?.imagenPortada?.asset?.url) {
    return urlFor(doc.imagenPortada).width(900).height(1260).fit('crop').crop('top').url()
  }
  // 3. First image in archivos (skip PDFs)
  const firstImage = doc?.archivos?.find(a =>
    a.asset?.metadata?.mimeType?.startsWith('image/')
  )
  if (firstImage?.asset?.url) {
    return urlFor(firstImage).width(900).height(1260).fit('crop').crop('top').url()
  }
  // 4. First PDF — Sanity auto-generates a thumbnail of page 1
  const firstPdf = doc?.archivos?.find(a =>
    a.asset?.metadata?.mimeType === 'application/pdf'
  )
  if (firstPdf?.asset?.url) {
    return `${firstPdf.asset.url}?w=900&h=1260&fit=crop`
  }
  return null
}

export function HomeClient({ counts, hero }: HomeClientProps) {
  const doc = hero?.destacadoDocumento
  const heroImageUrl = doc ? getHeroImageUrl(hero) : null

  return (
    <div>
      {/* ===== HERO DESTACADO ===== */}
      {doc ? (
        <div className="hero-featured">
          <div className="hero-featured-text">
            <span className="hero-featured-volanta">
              {doc.destacadoVolanta || 'Archivo destacado'}
            </span>
            <h1 className="hero-featured-title">
              {doc.destacadoTitulo || doc.titulo}
            </h1>
            <p className="hero-featured-bajada">
              {doc.destacadoBajada || doc.descripcion}
            </p>
            {(doc.destacadoRefAutor || doc.destacadoRefObra) && (
              <p className="hero-featured-ref">
                Para saber más sobre este documento, seguí leyendo{' '}
                {doc.destacadoRefObra && <em>{doc.destacadoRefObra}</em>}
                {doc.destacadoRefAutor && <> de {doc.destacadoRefAutor}</>}
                {doc.destacadoRefPaginas && <> ({doc.destacadoRefPaginas})</>}
              </p>
            )}
            <Link href={`/documento/${doc.slug.current}`} className="hero-featured-btn">
              Explorá este documento
            </Link>
          </div>
          {heroImageUrl && (
            <div className="hero-featured-image">
              <img src={heroImageUrl} alt={doc.destacadoTitulo || doc.titulo} />
            </div>
          )}
        </div>
      ) : (
        /* Fallback: hero estático cuando no hay documento destacado configurado */
        <div className="hero-featured">
          <div className="hero-featured-text">
            <span className="hero-featured-volanta">Archivo | Documento | 1954</span>
            <h1 className="hero-featured-title">Vialidad arregla un comodato con los pobladores forestales</h1>
            <p className="hero-featured-bajada">
              Cierre y crisis de La Forestal, éxodo de pueblos del norte santafesino, conflicto por la
              distribución de tierras. El cierre de Villa Ana y la intervención estatal para garantizar
              el arraigo de las comunidades afectadas.
            </p>
            <Link href="/catalogo" className="hero-featured-btn">Explorá este documento</Link>
          </div>
          <div className="hero-featured-image">
            <img src="/hero-featured.jpg" alt="La Forestal" />
          </div>
        </div>
      )}

      {/* ===== EXPLORE SECTION (8 cards: 4 arriba + 4 abajo) ===== */}
      <div className="explore-section">
        <h2 className="explore-title">Explorar</h2>
        <div className="card-grid">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="section-card">
                <div className={`card-img-header ${section.headerClass}`}>
                  <div className="icon-placeholder">{icons[section.icon]}</div>
                </div>
                <div className="card-body-inner">
                  <div className="list-item">
                    <h3 className="card-title">{section.title}</h3>
                  </div>
                  <div className="list-item">
                    <p className="card-desc">{section.desc}</p>
                  </div>
                </div>
                <div className="card-footer-inner">
                  <span className="btn-enter">Ingresar</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <div className="about-section">
        <div className="about-grid">
          <div className="about-image-col">
            <img src="/el-proyecto.png" alt="El proyecto" className="about-image" />
            <div className="about-caption">
              Archivo documental del Seminario Permanente de Historia del Norte de Santa Fe.
            </div>
          </div>
          <div>
            <h2 className="about-title">Sobre el proyecto</h2>
            <div className="about-text">
              <p>
                Este proyecto reúne documentos históricos, fotografías y material de investigación
                sobre la historia del norte de la provincia de Santa Fe. El archivo abarca desde
                las políticas forestales de La Forestal y la ocupación del territorio qom, hasta
                las luchas obreras y la memoria de las comunidades del norte santafesino.
              </p>
              <p style={{ marginTop: '1rem' }}>
                La plataforma digital introduce nuevas formas de conectar la documentación sobre
                los procesos históricos con narrativas que contextualizan y dan sentido a los
                archivos. Explorá el catálogo de {counts.documentos} documentos, las narrativas
                de divulgación y los actores que participaron de estos procesos.
              </p>
            </div>
            <Link href="/catalogo" className="btn-about">
              Explorar el archivo
            </Link>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/footer_logo.svg" alt="Historia del Norte" />
            </div>
            <div className="footer-col">
              <div className="footer-col-title">EXPLORAR</div>
              <Link href="/catalogo">Archivo</Link>
              <Link href="/instituciones">Instituciones</Link>
              <Link href="/pueblos">Pueblos</Link>
              <Link href="/actores">Actores</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">EXPLORAR</div>
              <Link href="/mapa">Mapa</Link>
              <Link href="/historia-oral">Historia Oral</Link>
              <Link href="/tiempo">Tiempo</Link>
              <Link href="/objetos">Objetos</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">INFO</div>
              <Link href="#">Documentación</Link>
              <Link href="#">Bibliografía</Link>
            </div>
            <div className="footer-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="back-icon">↑</span>
              <span className="back-label">VOLVER ARRIBA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
