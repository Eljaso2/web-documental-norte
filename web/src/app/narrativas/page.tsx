import { client } from '@/lib/sanity'
import { ALL_NARRATIVAS } from '@/lib/queries'
import Link from 'next/link'

export const revalidate = 60

export default async function NarrativasPage() {
  const narrativas = await client.fetch(ALL_NARRATIVAS)

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Section cover (Digital Benin: gold bg, white text) */}
      <section className="section-cover">
        <div className="cover-inner">
          <div className="cover-label">Divulgación</div>
          <h1 className="cover-title">Narrativas</h1>
          <p className="cover-desc">
            Historias cortas que contextualizan los documentos. La memoria del norte contada.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="section-body" style={{ paddingTop: '2rem' }}>
        <div className="card-grid">
          {narrativas.map((n: any, i: number) => (
            <Link key={n._id} href={`/narrativa/${n.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="doc-card">
                {/* Cover image header (Digital Benin: alternating bronze) */}
                <div className={`doc-thumb ${i % 2 === 0 ? 'light-primary' : 'dark-primary'}`}>
                  {n.imagenPortada?.asset?.url ? (
                    <img
                      src={n.imagenPortada.asset.url + '?w=600&h=600&fit=crop'}
                      alt={n.titulo}
                      loading="lazy"
                    />
                  ) : (
                    <div className="doc-thumb-placeholder">📖</div>
                  )}
                </div>
                <div className="doc-body">
                  <div className="list-item">
                    {n.encuentroSeminario && (
                      <div style={{ fontSize: '0.65rem', color: '#6c757d', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        {n.encuentroSeminario}
                      </div>
                    )}
                    <h3 className="doc-title">{n.titulo}</h3>
                  </div>
                  <div className="list-item">
                    {n.subtitulo && (
                      <div style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '0.3rem' }}>{n.subtitulo}</div>
                    )}
                    {n.resumen && (
                      <p className="doc-desc">{n.resumen}</p>
                    )}
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                      {n.documentosCount > 0 && (
                        <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                          {n.documentosCount} documento{n.documentosCount !== 1 ? 's' : ''}
                        </span>
                      )}
                      {n.temas?.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                          {n.temas.slice(0, 2).map((t: any) => (
                            <span key={t._id} className="badge-tag amber">{t.titulo}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="doc-footer">
                  <span className="btn-enter">Ingresar</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {narrativas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6c757d', fontSize: '0.9rem' }}>
            <div style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '1rem' }}>📖</div>
            Aún no hay narrativas disponibles. Se pueden crear desde el Studio.
          </div>
        )}
      </div>
    </div>
  )
}
