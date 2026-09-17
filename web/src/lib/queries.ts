// GROQ queries for the frontend

// Periodos: top-level (sin padre) con sub-períodos anidados recursivamente (3 niveles)
const SUB_PERIODO_DEEP = `_id, titulo, slug, nivel, anioInicio, anioFin,
  "subPeriodos": *[_type == "periodo" && periodoPadre._ref == ^._id] | order(anioInicio asc) { _id, titulo, slug, nivel, anioInicio, anioFin,
    "subPeriodos": *[_type == "periodo" && periodoPadre._ref == ^._id] | order(anioInicio asc) { _id, titulo, slug, nivel, anioInicio, anioFin }
  }`

const PERIODOS_TREE = `"periodos": periodos[]->{ _id, titulo, slug, nivel, anioInicio, anioFin,
  "subPeriodos": *[_type == "periodo" && periodoPadre._ref == ^._id] | order(anioInicio asc) { ${SUB_PERIODO_DEEP} }
}`

export const ALL_DOCUMENTOS = `*[_type == "documento"] | order(fecha.fechaInicio desc) {
  _id,
  titulo,
  slug,
  descripcion,
  fecha,
  nivelDescripcion,
  codigoReferencia,
  soporteOriginal,
  idioma,
  "tiposDocumento": tiposDocumento[]->{ _id, titulo, slug, color },
  ${PERIODOS_TREE},
  "regiones": regiones[]->{ _id, titulo, slug },
  "localidades": localidades[]->{ _id, titulo, slug, "region": region->{ _id, titulo, slug } },
  "temas": temas[]->{ _id, titulo, slug },
  "imagenPortada": imagenPortada{ asset->{ _id, url, metadata { dimensions } } },
  "archivos": archivos[0]{ asset->{ _id, url, metadata { dimensions } } }
}`

export const DOCUMENTO_BY_SLUG = `*[_type == "documento" && slug.current == $slug][0] {
  _id, titulo, slug, descripcion, fecha,
  codigoReferencia, nivelDescripcion, soporteOriginal, idioma,
  "tiposDocumento": tiposDocumento[]->{ _id, titulo, slug, color },
  ${PERIODOS_TREE},
  "regiones": regiones[]->{ _id, titulo, slug },
  "localidades": localidades[]->{ _id, titulo, slug, departamento, "region": region->{ _id, titulo, slug } },
  "temas": temas[]->{ _id, titulo, slug },
  "entesProductores": entesProductores[]{ rol, rolDetalle, "actor": actor->{ _id, nombre, tipoActor, nombreAlternativo } },
  "institucionCustodia": institucionCustodia->{ _id, titulo, slug, tipo, ubicacion },
  historiaArchivistica,
  "formatosSalida": formatosSalida[]->{ _id, titulo, slug, icono },
  "actores": actores[]{ rol, rolDetalle, "actor": actor->{ _id, nombre, tipoActor, nombreAlternativo } },
  "archivos": archivos[]{ asset->{ _id, url, originalFilename, metadata { dimensions } } },
  nivelAcceso, transcripcion,
  "narrativa": narrativa->{ _id, titulo, slug, resumen },
  fuenteArchivo, referenciaArchivo,
  "datosOriginales": datosOriginales[]{ campo, campoOriginal, valor }
}`

export const ALL_NARRATIVAS = `*[_type == "narrativa"] | order(titulo asc) {
  _id, titulo, slug, subtitulo, resumen, encuentroSeminario,
  "imagenPortada": imagenPortada{ asset->{ _id, url, metadata { dimensions } } },
  "documentosCount": count(documentos),
  "periodos": periodos[]->{ _id, titulo, slug },
  "temas": temas[]->{ _id, titulo, slug }
}`

export const NARRATIVA_BY_SLUG = `*[_type == "narrativa" && slug.current == $slug][0] {
  _id, titulo, slug, subtitulo, resumen, contenido, encuentroSeminario,
  "imagenPortada": imagenPortada{ asset->{ _id, url, metadata { dimensions } }, hotspot },
  "documentos": documentos[]->{ _id, titulo, slug, fecha, "tiposDocumento": tiposDocumento[]->{ titulo, slug, color } },
  "regiones": regiones[]->{ _id, titulo, slug },
  "localidades": localidades[]->{ _id, titulo, slug },
  "periodos": periodos[]->{ _id, titulo, slug, anioInicio, anioFin },
  "temas": temas[]->{ _id, titulo, slug },
  "actores": actores[]{ rol, rolDetalle, "actor": actor->{ _id, nombre, tipoActor } }
}`

export const ALL_REGIONES = `*[_type == "region"] | order(orden asc) { _id, titulo, slug, nombrePopular }`
export const ALL_LOCALIDADES = `*[_type == "localidad"] | order(orden asc) { _id, titulo, slug, departamento, "region": region->{ _id, titulo, slug } }`
export const ALL_PERIODOS = `*[_type == "periodo"] | order(anioInicio asc) { _id, titulo, slug, nivel, anioInicio, anioFin, "periodoPadre": periodoPadre->{ _id, titulo } }`
export const ALL_TIPOS_DOCUMENTO = `*[_type == "tipoDocumento"] | order(orden asc) { _id, titulo, slug, color }`
export const ALL_TEMAS = `*[_type == "tema"] | order(orden asc) { _id, titulo, slug }`
export const ALL_INSTITUCIONES_CUSTODIA = `*[_type == "institucionCustodia"] | order(orden asc) { _id, titulo, slug, tipo, ubicacion }`

export const COUNTS = `{
  "documentos": count(*[_type == "documento"]),
  "narrativas": count(*[_type == "narrativa"]),
  "actores": count(*[_type == "actor"])
}`

export const SITE_SETTINGS = `*[_id == "site-settings"][0] {
  "destacadoImagen": destacadoImagen {
    asset->{ _id, url, metadata { dimensions } },
    hotspot
  },
  "destacadoDocumento": destacadoDocumento->{
    _id, titulo, slug, descripcion,
    destacadoVolanta, destacadoTitulo, destacadoBajada,
    "imagenPortada": imagenPortada{ asset->{ _id, url, metadata { dimensions } } },
    "archivos": archivos[]{ asset->{ _id, url, metadata { dimensions }, mimeType } }
  },
  catalogoDestacadoTitulo,
  catalogoDestacadoBajada,
  catalogoDestacadoRefAutor,
  catalogoDestacadoRefObra,
  catalogoDestacadoRefAnio,
  catalogoDestacadoRefPaginas,
  "catalogoDestacadoDocumento": catalogoDestacadoDocumento->{
    _id, titulo, slug, descripcion
  }
}`
