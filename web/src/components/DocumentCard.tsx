import Link from 'next/link'

/** Extract YouTube thumbnail URL from an enlace */
function getYtThumbnail(enlaces: Array<{ url: string; plataforma?: string }> | undefined): string | null {
  if (!enlaces?.length) return null
  const yt = enlaces.find(e => e.plataforma === 'youtube')
  if (!yt) return null
  const match = yt.url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

interface DocumentCardProps {
  documento: {
    _id: string
    titulo: string
    slug: { current: string }
    descripcion?: string
    fecha?: {
      fechaDisplay?: string
      fechaInicio?: string
      circa?: boolean
    }
    tiposDocumento?: Array<{
      _id: string
      titulo: string
      slug: string
      color?: string
    }>
    entesProductores?: Array<{
      rol?: string
      actor?: {
        _id: string
        nombre: string
        tipoActor?: string
      }
    }>
    periodos?: Array<{
      _id: string
      titulo: string
      slug: string
    }>
    temas?: Array<{
      _id: string
      titulo: string
      slug: string
    }>
    imagenPortada?: {
      asset?: {
        _id: string
        url: string
        metadata?: { dimensions?: { width: number; height: number } }
      }
    }
    archivos?: Array<{
      asset?: {
        _id: string
        url: string
        metadata?: { dimensions?: { width: number; height: number } }
      }
    }>
    enlacesAudiovisuales?: Array<{
      url: string
      plataforma?: string
    }>
  }
}

export function DocumentCard({ documento }: DocumentCardProps) {
  const dateDisplay = documento.fecha?.fechaDisplay || documento.fecha?.fechaInicio?.slice(0, 4) || ''
  const circa = documento.fecha?.circa ? 'c. ' : ''

  // Thumbnail priority: imagenPortada > first archivo image > YouTube thumbnail
  const imageUrl =
    documento.imagenPortada?.asset?.url ||
    (documento.archivos as any)?.asset?.url ||
    (documento.archivos as any)?.[0]?.asset?.url ||
    getYtThumbnail(documento.enlacesAudiovisuales)

  const hasImage = !!imageUrl
  const isVideoThumb = !!imageUrl && !documento.imagenPortada?.asset?.url && !(documento.archivos as any)?.asset?.url && !(documento.archivos as any)?.[0]?.asset?.url

  // Alternate header colors like Digital Benin
  const headerClass = hasImage ? 'light-primary' : 'dark-primary'

  return (
    <Link href={`/documento/${documento.slug.current}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="doc-card">
        {/* Thumbnail header (Digital Benin: bronze header + inverted/covered image) */}
        <div className={`doc-thumb ${headerClass}`}>
          {hasImage ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={isVideoThumb ? imageUrl! : imageUrl! + '?w=600&h=600&fit=crop'}
                alt={documento.titulo}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {isVideoThumb && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.15)',
                }}>
                  <div style={{
                    width: '3rem', height: '3rem', borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '1.2rem', lineHeight: 1,
                  }}>
                    ▶
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="doc-thumb-placeholder">📄</div>
          )}
        </div>

        {/* Card body (Digital Benin: list-group flush) */}
        <div className="doc-body">
          {/* Title */}
          <div className="list-item">
            <h3 className="doc-title">{documento.titulo}</h3>
          </div>

          {/* Description + meta */}
          <div className="list-item">
            {(dateDisplay || documento.entesProductores?.length) && (
              <div className="doc-meta" style={{ marginBottom: '0.25rem' }}>
                {dateDisplay && <>{circa}{dateDisplay}</>}
                {documento.entesProductores?.length && dateDisplay && ' · '}
                {documento.entesProductores?.map(e => e.actor?.nombre).filter(Boolean).join(', ')}
              </div>
            )}
            {documento.descripcion && (
              <p className="doc-desc">{documento.descripcion}</p>
            )}
            {/* Type badges */}
            {documento.tiposDocumento && documento.tiposDocumento.length > 0 && (
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {documento.tiposDocumento.map((tipo) => (
                  <span
                    key={tipo._id}
                    className="badge-tag custom"
                    style={{ background: tipo.color || '#343a40' }}
                  >
                    {tipo.titulo}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Enter button */}
        <div className="doc-footer">
          <span className="btn-enter">Ingresar</span>
        </div>
      </div>
    </Link>
  )
}
