// === CATALOG QUERIES ===

export const ALL_DOCUMENTOS = `*[_type == "documento"] | order(fecha.fechaInicio desc) {
  _id,
  titulo,
  slug,
  fecha,
  "tiposDocumento": tiposDocumento[]->{
    _id, titulo, slug, color
  },
  "periodos": periodos[]->{
    _id, titulo, slug, anioInicio, anioFin
  },
  "regiones": regiones[]->{
    _id, titulo, slug
  },
  "localidades": localidades[]->{
    _id, titulo, slug
  },
  "temas": temas[]->{
    _id, titulo, slug
  },
  "formatosSalida": formatosSalida[]->{
    _id, titulo, slug, icono
  },
  "actores": actores[]{
    rol,
    rolDetalle,
    "actor": actor->{
      _id, nombre, tipoActor
    }
  },
  "imagenPortada": imagenPortada{
    asset->{
      _id, url, metadata { dimensions }
    }
  },
  "archivos": archivos[0]{
    asset->{
      _id, url, metadata { dimensions }
    }
  },
  nivelAcceso,
  "narrativa": narrativa->{
    _id, titulo, slug
  }
}`

export const DOCUMENTO_BY_SLUG = `*[_type == "documento" && slug.current == $slug][0] {
  _id,
  titulo,
  slug,
  descripcion,
  fecha,
  "tiposDocumento": tiposDocumento[]->{
    _id, titulo, slug, color
  },
  "periodos": periodos[]->{
    _id, titulo, slug, anioInicio, anioFin
  },
  "regiones": regiones[]->{
    _id, titulo, slug
  },
  "localidades": localidades[]->{
    _id, titulo, slug, departamento
  },
  "temas": temas[]->{
    _id, titulo, slug
  },
  "entesProductores": entesProductores[]->{
    _id, titulo, slug, nombrePopular, nombreLegal, tipoEnte
  },
  "formatosSalida": formatosSalida[]->{
    _id, titulo, slug, icono
  },
  "actores": actores[]{
    rol,
    rolDetalle,
    "actor": actor->{
      _id, nombre, tipoActor, nombreAlternativo
    }
  },
  "archivos": archivos[]{
    asset->{
      _id, url, originalFilename, metadata { dimensions }
    }
  },
  nivelAcceso,
  transcripcion,
  "narrativa": narrativa->{
    _id, titulo, slug, resumen
  },
  fuenteArchivo,
  referenciaArchivo,
  "datosOriginales": datosOriginales[]{
    campo, campoOriginal, valor
  }
}`

// === NARRATIVE QUERIES ===

export const ALL_NARRATIVAS = `*[_type == "narrativa"] | order(titulo asc) {
  _id,
  titulo,
  slug,
  subtitulo,
  resumen,
  encuentroSeminario,
  "imagenPortada": imagenPortada{
    asset->{
      _id, url, metadata { dimensions }
    }
  },
  "documentos": count(documentos),
  "periodos": periodos[]->{
    _id, titulo, slug
  },
  "temas": temas[]->{
    _id, titulo, slug
  }
}`

export const NARRATIVA_BY_SLUG = `*[_type == "narrativa" && slug.current == $slug][0] {
  _id,
  titulo,
  slug,
  subtitulo,
  resumen,
  contenido,
  encuentroSeminario,
  "imagenPortada": imagenPortada{
    asset->{
      _id, url, metadata { dimensions }
    },
    hotspot
  },
  "documentos": documentos[]->{
    _id, titulo, slug, fecha,
    "tiposDocumento": tiposDocumento[]->{ titulo, slug, color }
  },
  "regiones": regiones[]->{ _id, titulo, slug },
  "localidades": localidades[]->{ _id, titulo, slug },
  "periodos": periodos[]->{ _id, titulo, slug, anioInicio, anioFin },
  "temas": temas[]->{ _id, titulo, slug },
  "actores": actores[]{
    rol, rolDetalle,
    "actor": actor->{ _id, nombre, tipoActor }
  }
}`

// === TAXONOMY QUERIES ===

export const ALL_REGIONES = `*[_type == "region"] | order(orden asc) { _id, titulo, slug, nombrePopular }`

export const ALL_LOCALIDADES = `*[_type == "localidad"] | order(orden asc) { _id, titulo, slug, departamento, "region": region->{ _id, titulo } }`

export const ALL_PERIODOS = `*[_type == "periodo"] | order(anioInicio asc) { _id, titulo, slug, anioInicio, anioFin }`

export const ALL_TIPOS_DOCUMENTO = `*[_type == "tipoDocumento"] | order(orden asc) { _id, titulo, slug, color }`

export const ALL_TEMAS = `*[_type == "tema"] | order(orden asc) { _id, titulo, slug }`

// === COUNT QUERIES (for homepage) ===

export const COUNTS = `{
  "documentos": count(*[_type == "documento"]),
  "narrativas": count(*[_type == "narrativa"]),
  "actores": count(*[_type == "actor"])
}`
