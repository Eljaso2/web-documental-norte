import { client } from '@/lib/sanity'
import { NARRATIVA_BY_SLUG, ALL_NARRATIVAS } from '@/lib/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { DocumentCard } from '@/components/DocumentCard'

export const revalidate = 60

export async function generateStaticParams() {
  const narrativas = await client.fetch(ALL_NARRATIVAS)
  return narrativas.map((n: any) => ({ slug: n.slug.current }))
}

export default async function NarrativaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const narrativa = await client.fetch(NARRATIVA_BY_SLUG, { slug })

  if (!narrativa) notFound()

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="section-body" style={{ paddingTop: '2rem' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#6c757d', textTransform: 'uppercase', marginBottom: '1rem' }}>
          <Link href="/narrativas" style={{ color: '#6c757d' }}>Narrativas</Link>
          <span style={{ margin: '0 0.4rem' }}>→</span>
          <span>{narrativa.titulo}</span>
        </div>

        {/* Header */}
        {narrativa.encuentroSeminario && (
          <div style={{ fontSize: '0.7rem', color: '#a08841', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {narrativa.encuentroSeminario}
          </div>
        )}
        <h1 style={{
          fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          color: '#212529', marginBottom: '0.3rem', letterSpacing: '-0.02em', lineHeight: 1.15,
        }}>
          {narrativa.titulo}
        </h1>
        {narrativa.subtitulo && (
          <div style={{ fontSize: '1.05rem', color: '#495057', marginBottom: '1.5rem' }}>{narrativa.subtitulo}</div>
        )}

        {/* Content */}
        {narrativa.contenido && (
          <div style={{ fontSize: '1rem', lineHeight: 1.8, color: '#495057', maxWidth: '72ch', marginBottom: '2.5rem' }}>
            <PortableText value={narrativa.contenido} />
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {narrativa.temas?.map((t: any) => (
            <span key={t._id} className="badge-tag amber">{t.titulo}</span>
          ))}
          {narrativa.periodos?.map((p: any) => (
            <span key={p._id} className="badge-tag">{p.titulo}</span>
          ))}
        </div>

        {/* Referenced documents */}
        {narrativa.documentos?.length > 0 && (
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.8rem' }}>
              Documentos referenciados
            </div>
            <div className="card-grid">
              {narrativa.documentos.map((doc: any) => (
                <DocumentCard key={doc._id} documento={doc} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
