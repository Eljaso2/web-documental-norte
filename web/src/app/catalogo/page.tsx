import Link from 'next/link'
import { client } from '@/lib/sanity'
import { ALL_DOCUMENTOS, ALL_REGIONES, ALL_LOCALIDADES, ALL_PERIODOS, ALL_TIPOS_DOCUMENTO, ALL_TEMAS, SITE_SETTINGS } from '@/lib/queries'
import { DocumentCatalog } from '@/components/DocumentCatalog'

export const revalidate = 60

export default async function CatalogoPage() {
  const [documentos, regiones, localidades, periodos, tiposDocumento, temas, siteSettings] = await Promise.all([
    client.fetch(ALL_DOCUMENTOS),
    client.fetch(ALL_REGIONES),
    client.fetch(ALL_LOCALIDADES),
    client.fetch(ALL_PERIODOS),
    client.fetch(ALL_TIPOS_DOCUMENTO),
    client.fetch(ALL_TEMAS),
    client.fetch(SITE_SETTINGS),
  ])

  const catDestacado = siteSettings?.catalogoDestacadoDocumento
  const catRef = siteSettings?.catalogoDestacadoRefAutor
    ? {
        autor: siteSettings.catalogoDestacadoRefAutor,
        obra: siteSettings.catalogoDestacadoRefObra,
        anio: siteSettings.catalogoDestacadoRefAnio,
        paginas: siteSettings.catalogoDestacadoRefPaginas,
      }
    : null

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Section cover */}
      <section className="section-cover">
        <div className="cover-inner">
          <div className="cover-label">Archivo Documental</div>

          {catDestacado ? (
            <>
              <h1 className="cover-title">
                {siteSettings.catalogoDestacadoTitulo || catDestacado.titulo}
              </h1>
              <p className="cover-desc">
                {siteSettings.catalogoDestacadoBajada || catDestacado.descripcion}
              </p>

              {catRef && (
                <div className="cover-referencia">
                  <span className="ref-icon">📖</span>
                  <span className="ref-cita">
                    {catRef.autor},{' '}
                    <em>{catRef.obra}</em>
                    {catRef.anio && <>, {catRef.anio}</>}
                    {catRef.paginas && <>, {catRef.paginas}</>}
                  </span>
                </div>
              )}

              <Link
                href={`/documento/${catDestacado.slug.current}`}
                className="cover-cta"
              >
                Explorar este documento →
              </Link>
            </>
          ) : (
            <>
              <h1 className="cover-title">Catálogo</h1>
              <p className="cover-desc">
                Explorá los documentos por región, localidad, período, tipo o tema. Filtros cruzados para investigadores.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Catalog content */}
      <div className="section-body" style={{ paddingTop: '2rem' }}>
        <DocumentCatalog
          documentos={documentos}
          regiones={regiones}
          localidades={localidades}
          periodos={periodos}
          tiposDocumento={tiposDocumento}
          temas={temas}
        />
      </div>
    </div>
  )
}
