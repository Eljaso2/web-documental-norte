import { client } from '@/lib/sanity'
import { DOCUMENTO_BY_SLUG, ALL_DOCUMENTOS } from '@/lib/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RawDataPanel } from '@/components/RawDataPanel'

/** Auto-detect embed URL from any external URL (YouTube, Vimeo, etc.) */
function getEmbedInfo(url: string): { embedUrl: string; label: string } | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
  if (ytMatch) return { embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}`, label: 'YouTube' }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return { embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`, label: 'Vimeo' }
  return null
}

export const revalidate = 60

export async function generateStaticParams() {
  const documentos = await client.fetch(ALL_DOCUMENTOS)
  return documentos.map((doc: any) => ({ slug: doc.slug.current }))
}

export default async function DocumentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await client.fetch(DOCUMENTO_BY_SLUG, { slug })

  if (!doc) notFound()

  // Recursive renderer for sub-periods (depth is bounded by GROQ query: 3 levels)
  function renderSubPeriodos(subs: any[], depth = 0) {
    const fontSize = Math.max(0.72, 0.82 - depth * 0.06)
    const color = depth === 0 ? '#6c757d' : '#868e96'
    return subs.map((sp: any, i: number) => (
      <div key={i}>
        <div style={{ fontSize: `${fontSize}rem`, color, lineHeight: 1.6 }}>
          {sp.titulo}{sp.anioInicio ? ` (${sp.anioInicio}${sp.anioFin ? `-${sp.anioFin}` : '+'})` : ''}
        </div>
        {sp.subPeriodos?.length > 0 && (
          <div style={{ marginLeft: '1rem', borderLeft: '2px solid #dee2e6', paddingLeft: '0.5rem' }}>
            {renderSubPeriodos(sp.subPeriodos, depth + 1)}
          </div>
        )}
      </div>
    ))
  }

  const dateDisplay = doc.fecha?.fechaDisplay ||
    (doc.fecha?.fechaInicio ? doc.fecha.fechaInicio.slice(0, 10) : '')
  const circa = doc.fecha?.circa ? 'c. ' : ''

  const rolLabels: Record<string, string> = {
    'empresa-desalojo': 'Empresa responsable de desalojos',
    'fuerza-represiva': 'Fuerza represiva',
    'organizador-huelga': 'Organizador de huelga',
    'sindicato': 'Sindicato',
    'autor-productor': 'Autor / productor',
    'destinatario': 'Destinatario',
    'legislador': 'Legislador',
    'fiscal-investigador': 'Fiscal / investigador',
    'testigo': 'Testigo',
    'otro': 'Otro',
  }

  const nivelDescripcionLabels: Record<string, string> = {
    'fondo': 'Fondo',
    'serie': 'Serie',
    'unidad-compuesta': 'Unidad documental compuesta',
    'pieza-suelta': 'Unidad documental simple (pieza suelta)',
  }

  const soporteLabels: Record<string, string> = {
    'papel': 'Papel',
    'fotografia': 'Fotografía',
    'cinta-magnetica': 'Cinta magnética',
    'vidrio': 'Vidrio (placa fotográfica)',
    'digital-nativo': 'Digital nativo',
    'otro': 'Otro',
  }

  const idiomaLabels: Record<string, string> = {
    'es': 'Español',
    'en': 'Inglés',
    'it': 'Italiano',
    'pt': 'Portugués',
    'de': 'Alemán',
    'fr': 'Francés',
    'gn': 'Guaraní',
    'otro': 'Otro',
  }

  const nivelAccesoLabels: Record<string, { label: string; color: string }> = {
    'publico': { label: 'Público', color: '#28a745' },
    'restringido': { label: 'Restringido', color: '#dc3545' },
    'confidencial': { label: 'Confidencial', color: '#6c757d' },
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="section-body" style={{ paddingTop: '2rem' }}>
        {/* Breadcrumb (Digital Benin: muted, uppercase, small) */}
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#6c757d', textTransform: 'uppercase', marginBottom: '1rem' }}>
          <Link href="/catalogo" style={{ color: '#6c757d' }}>Archivo</Link>
          <span style={{ margin: '0 0.4rem' }}>→</span>
          <span>Documento</span>
        </div>

        {/* ISAD-G identification strip */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
          {doc.codigoReferencia && (
            <span style={{
              fontSize: '0.72rem', fontFamily: 'monospace', letterSpacing: '0.04em',
              background: '#f8f9fa', border: '1px solid #dee2e6',
              padding: '0.15rem 0.5rem', color: '#495057',
            }}>
              {doc.codigoReferencia}
            </span>
          )}
          {doc.nivelDescripcion && nivelDescripcionLabels[doc.nivelDescripcion] && (
            <span className="badge-tag" style={{ background: '#495057' }}>
              {nivelDescripcionLabels[doc.nivelDescripcion]}
            </span>
          )}
          {doc.nivelAcceso && nivelAccesoLabels[doc.nivelAcceso] && (
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
              color: nivelAccesoLabels[doc.nivelAcceso].color,
              border: `1px solid ${nivelAccesoLabels[doc.nivelAcceso].color}`,
              padding: '0.1rem 0.45rem',
            }}>
              {nivelAccesoLabels[doc.nivelAcceso].label}
            </span>
          )}
        </div>

        {/* Title + Date */}
        <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {doc.tiposDocumento?.map((tipo: any) => (
            <span
              key={tipo._id}
              className="badge-tag custom"
              style={{ background: tipo.color || '#343a40' }}
            >
              {tipo.titulo}
            </span>
          ))}
        </div>
        <h1 style={{
          fontFamily: 'inherit', fontWeight: 800,
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#212529',
          marginBottom: '0.5rem', letterSpacing: '-0.02em', lineHeight: 1.15,
        }}>
          {doc.titulo}
        </h1>
        {dateDisplay && (
          <div style={{ fontSize: '0.88rem', color: '#6c757d', marginBottom: '1.5rem' }}>
            {circa}{dateDisplay}
          </div>
        )}

        {/* Description */}
        {doc.descripcion && (
          <div style={{ fontSize: '1rem', lineHeight: 1.7, color: '#495057', marginBottom: '2rem' }}>
            {doc.descripcion}
          </div>
        )}

        {/* Taxonomy grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {doc.regiones?.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Regiones</div>
              {doc.regiones.map((r: any) => <div key={r._id} style={{ fontSize: '0.88rem', color: '#495057' }}>{r.titulo}</div>)}
            </div>
          )}
          {doc.localidades?.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Localidades</div>
              {doc.localidades.map((l: any) => <div key={l._id} style={{ fontSize: '0.88rem', color: '#495057' }}>{l.titulo}{l.region ? ` (${l.region.titulo})` : l.departamento ? ` (${l.departamento})` : ''}</div>)}
            </div>
          )}
          {doc.periodos?.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Tiempo</div>
              {doc.periodos.map((p: any) => (
                <div key={p._id}>
                  <div style={{ fontSize: '0.88rem', color: '#495057', fontWeight: 600 }}>{p.titulo} ({p.anioInicio}{p.anioFin ? `-${p.anioFin}` : '+'})</div>
                  {p.subPeriodos?.length > 0 && (
                    <div style={{ marginLeft: '1rem', borderLeft: '2px solid #dee2e6', paddingLeft: '0.5rem' }}>
                      {renderSubPeriodos(p.subPeriodos)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {doc.entesProductores?.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Entes productores</div>
              {doc.entesProductores.map((e: any, i: number) => (
                <div key={i} style={{ fontSize: '0.88rem', color: '#495057' }}>
                  {e.actor?.nombre}
                  {e.rol && <span style={{ fontSize: '0.72rem', color: '#a08841', fontWeight: 600, marginLeft: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rolLabels[e.rol] || e.rol}</span>}
                </div>
              ))}
            </div>
          )}
          {doc.institucionCustodia && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Institución de custodia</div>
              <div style={{ fontSize: '0.88rem', color: '#495057' }}>
                {doc.institucionCustodia.titulo}
                {doc.institucionCustodia.ubicacion ? ` — ${doc.institucionCustodia.ubicacion}` : ''}
              </div>
            </div>
          )}
          {doc.temas?.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Temas</div>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {doc.temas.map((t: any) => <span key={t._id} className="badge-tag amber">{t.titulo}</span>)}
              </div>
            </div>
          )}
          {doc.formatosSalida?.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Formatos de salida</div>
              {doc.formatosSalida.map((f: any) => <div key={f._id} style={{ fontSize: '0.88rem', color: '#495057' }}>{f.titulo}</div>)}
            </div>
          )}
          {doc.soporteOriginal && soporteLabels[doc.soporteOriginal] && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Soporte original</div>
              <div style={{ fontSize: '0.88rem', color: '#495057' }}>{soporteLabels[doc.soporteOriginal]}</div>
            </div>
          )}
          {doc.idioma && idiomaLabels[doc.idioma] && (
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Idioma</div>
              <div style={{ fontSize: '0.88rem', color: '#495057' }}>{idiomaLabels[doc.idioma]}</div>
            </div>
          )}
        </div>

        {/* Archival history */}
        {doc.historiaArchivistica && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.6rem' }}>Historia archivística</div>
            <div style={{ fontSize: '0.92rem', lineHeight: 1.7, color: '#495057', maxWidth: '72ch' }}>
              {doc.historiaArchivistica}
            </div>
          </div>
        )}

        {/* Actors */}
        {doc.actores?.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.6rem' }}>Actores involucrados</div>
            {doc.actores.map((a: any, i: number) => (
              <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #dee2e6', display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.88rem', color: '#212529', fontWeight: 600 }}>{a.actor?.nombre}</span>
                <span style={{ fontSize: '0.72rem', color: '#a08841', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {rolLabels[a.rol] || a.rol}
                </span>
                {a.rolDetalle && <span style={{ fontSize: '0.78rem', color: '#6c757d' }}>({a.rolDetalle})</span>}
              </div>
            ))}
          </div>
        )}

        {/* Digital assets */}
        {doc.archivos?.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.6rem' }}>Archivos digitales</div>
            {doc.archivos.map((archivo: any, i: number) => {
              const url = archivo.asset?.url
              if (!url) return null
              const mimeType = archivo.asset?.metadata?.mimeType || ''
              const isImage = archivo.asset?.metadata?.dimensions && mimeType.startsWith('image/')
              const isPdf = mimeType === 'application/pdf' || url.endsWith('.pdf') || archivo.asset?.originalFilename?.endsWith('.pdf')
              const isVideo = mimeType.startsWith('video/') || /\.(mp4|webm|ogg|mov)$/i.test(url)
              const isAudio = mimeType.startsWith('audio/') || /\.(mp3|ogg|wav|m4a|aac|flac)$/i.test(url)

              if (isImage) {
                return (
                  <div key={i} style={{ background: '#f8f9fa', border: '1px solid #dee2e6', marginBottom: '1rem' }}>
                    <img
                      src={url}
                      alt={doc.titulo}
                      style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '80vh', objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </div>
                )
              }

              if (isPdf) {
                return (
                  <div key={i} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', overflow: 'hidden' }}>
                      <iframe
                        src={url}
                        style={{ width: '100%', height: '70vh', border: 'none', display: 'block' }}
                        title={archivo.asset?.originalFilename || 'PDF'}
                      />
                    </div>
                    <a
                      href={url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        marginTop: '0.6rem', fontSize: '0.85rem', fontWeight: 500,
                        color: '#a08841', textDecoration: 'none',
                      }}
                    >
                      📥 Descargar {archivo.asset?.originalFilename || 'PDF'}
                    </a>
                  </div>
                )
              }

              if (isVideo) {
                return (
                  <div key={i} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', overflow: 'hidden' }}>
                      <video
                        controls
                        preload="metadata"
                        style={{ width: '100%', maxHeight: '80vh', display: 'block' }}
                      >
                        <source src={url} type={mimeType || undefined} />
                        Tu navegador no soporta video HTML5.
                      </video>
                    </div>
                    <a
                      href={url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        marginTop: '0.6rem', fontSize: '0.85rem', fontWeight: 500,
                        color: '#a08841', textDecoration: 'none',
                      }}
                    >
                      🎬 Descargar {archivo.asset?.originalFilename || 'video'}
                    </a>
                  </div>
                )
              }

              if (isAudio) {
                return (
                  <div key={i} style={{ marginBottom: '1rem' }}>
                    <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', padding: '1.4rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#495057', marginBottom: '0.6rem', fontWeight: 600 }}>
                        🎵 {archivo.asset?.originalFilename || 'Audio'}
                      </div>
                      <audio controls preload="metadata" style={{ width: '100%' }}>
                        <source src={url} type={mimeType || undefined} />
                        Tu navegador no soporta audio HTML5.
                      </audio>
                    </div>
                    <a
                      href={url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        marginTop: '0.4rem', fontSize: '0.85rem', fontWeight: 500,
                        color: '#a08841', textDecoration: 'none',
                      }}
                    >
                      📥 Descargar {archivo.asset?.originalFilename || 'audio'}
                    </a>
                  </div>
                )
              }

              return (
                <div key={i} style={{ marginBottom: '0.8rem' }}>
                  <a
                    href={url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      fontSize: '0.88rem', fontWeight: 500,
                      color: '#a08841', textDecoration: 'none',
                      background: '#f8f9fa', border: '1px solid #dee2e6',
                      padding: '0.8rem 1.2rem',
                    }}
                  >
                    📎 {archivo.asset?.originalFilename || 'Descargar archivo'}
                  </a>
                </div>
              )
            })}
          </div>
        )}

        {/* External audiovisual (YouTube, Vimeo, etc.) */}
        {doc.enlacesAudiovisuales?.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.6rem' }}>Audiovisual</div>
            {doc.enlacesAudiovisuales.map((enlace: any, i: number) => {
              const embedInfo = getEmbedInfo(enlace.url)

              if (embedInfo) {
                return (
                  <div key={i} style={{ marginBottom: '1.5rem' }}>
                    {enlace.titulo && (
                      <div style={{ fontSize: '0.92rem', color: '#495057', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {enlace.titulo}
                      </div>
                    )}
                    <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', overflow: 'hidden', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                      <iframe
                        src={embedInfo.embedUrl}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title={enlace.titulo || 'Video embebido'}
                      />
                    </div>
                    <a
                      href={enlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        marginTop: '0.5rem', fontSize: '0.82rem', fontWeight: 500,
                        color: '#a08841', textDecoration: 'none',
                      }}
                    >
                      🔗 Ver en {embedInfo.label}
                    </a>
                  </div>
                )
              }

              // "otra" plataforma — link externo
              return (
                <div key={i} style={{ marginBottom: '0.8rem' }}>
                  <a
                    href={enlace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      fontSize: '0.88rem', fontWeight: 500,
                      color: '#a08841', textDecoration: 'none',
                      background: '#f8f9fa', border: '1px solid #dee2e6',
                      padding: '0.8rem 1.2rem',
                    }}
                  >
                    🔗 {enlace.titulo || enlace.url}
                  </a>
                </div>
              )
            })}
          </div>
        )}

        {/* Transcription */}
        {doc.transcripcion && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.6rem' }}>Transcripción</div>
            <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', padding: '1.4rem', fontSize: '0.92rem', lineHeight: 1.7, color: '#495057', whiteSpace: 'pre-wrap' }}>
              {doc.transcripcion}
            </div>
          </div>
        )}

        {/* Narrative link */}
        {doc.narrativa && (
          <div style={{ marginBottom: '2rem' }}>
            <Link href={`/narrativa/${doc.narrativa.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #dee2e6', padding: '1.4rem', borderLeft: '3px solid #a08841' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#a08841', marginBottom: '0.4rem' }}>Narrativa asociada</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#212529' }}>{doc.narrativa.titulo}</div>
                {doc.narrativa.resumen && <div style={{ fontSize: '0.88rem', color: '#6c757d', marginTop: '0.3rem' }}>{doc.narrativa.resumen}</div>}
              </div>
            </Link>
          </div>
        )}

        {/* Raw data panel */}
        <RawDataPanel
          fuenteArchivo={doc.fuenteArchivo}
          referenciaArchivo={doc.referenciaArchivo}
          datosOriginales={doc.datosOriginales}
        />
      </div>
    </div>
  )
}
