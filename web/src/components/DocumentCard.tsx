import Link from 'next/link'

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
  }
}

export function DocumentCard({ documento }: DocumentCardProps) {
  const dateDisplay = documento.fecha?.fechaDisplay || documento.fecha?.fechaInicio?.slice(0, 4) || ''
  const circa = documento.fecha?.circa ? 'c. ' : ''
  const imageUrl = documento.imagenPortada?.asset?.url || (documento.archivos as any)?.asset?.url || (documento.archivos as any)?.[0]?.asset?.url
  const hasImage = !!imageUrl

  // Alternate header colors like Digital Benin
  const headerClass = hasImage ? 'light-primary' : 'dark-primary'

  return (
    <Link href={`/documento/${documento.slug.current}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="doc-card">
        {/* Thumbnail header (Digital Benin: bronze header + inverted/covered image) */}
        <div className={`doc-thumb ${headerClass}`}>
          {hasImage ? (
            <img
              src={imageUrl! + '?w=600&h=600&fit=crop'}
              alt={documento.titulo}
              loading="lazy"
            />
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
            {dateDisplay && (
              <div className="doc-meta" style={{ marginBottom: '0.25rem' }}>
                {circa}{dateDisplay}
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
