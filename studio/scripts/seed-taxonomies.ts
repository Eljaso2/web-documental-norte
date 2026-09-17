import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '06aqvaal',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function seed() {
  console.log('Seeding taxonomy terms...\n')

  // === REGIONES ===
  const regiones = [
    { _id: 'region-chaco-santafesino', _type: 'region', titulo: 'Chaco Santafesino', slug: { _type: 'slug', current: 'chaco-santafesino' }, nombrePopular: 'La Cuña Boscosa', descripcion: 'Región forestal del norte de Santa Fe, históricamente dominada por el quebracho colorado y la industria taninera.' },
    { _id: 'region-costa-norte', _type: 'region', titulo: 'Costa del Norte Santafesino', slug: { _type: 'slug', current: 'costa-norte-santafesino' }, descripcion: 'Zona costera del río Paraná en el norte de la provincia de Santa Fe.' },
  ]

  // === LOCALIDADES ===
  const localidades = [
    { _id: 'loc-villa-guillermina', _type: 'localidad', titulo: 'Villa Guillermina', slug: { _type: 'slug', current: 'villa-guillermina' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-villa-ana', _type: 'localidad', titulo: 'Villa Ana', slug: { _type: 'slug', current: 'villa-ana' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-la-gallareta', _type: 'localidad', titulo: 'La Gallareta', slug: { _type: 'slug', current: 'la-gallareta' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-tartagal', _type: 'localidad', titulo: 'Tartagal', slug: { _type: 'slug', current: 'tartagal' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-fortin-olmos', _type: 'localidad', titulo: 'Fortín Olmos', slug: { _type: 'slug', current: 'fortin-olmos' }, departamento: 'Vera', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-villa-ocampo', _type: 'localidad', titulo: 'Villa Ocampo', slug: { _type: 'slug', current: 'villa-ocampo' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-reconquista', _type: 'localidad', titulo: 'Reconquista', slug: { _type: 'slug', current: 'reconquista' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-costa-norte' } },
    { _id: 'loc-san-antonio', _type: 'localidad', titulo: 'San Antonio de Obligado', slug: { _type: 'slug', current: 'san-antonio-de-obligado' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-colonia-dolores', _type: 'localidad', titulo: 'Colonia Dolores', slug: { _type: 'slug', current: 'colonia-dolores' }, departamento: 'General Obligado', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-intiyaco', _type: 'localidad', titulo: 'Intiyaco', slug: { _type: 'slug', current: 'intiyaco' }, departamento: 'Vera', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-laguna-paiva', _type: 'localidad', titulo: 'Laguna Paiva', slug: { _type: 'slug', current: 'laguna-paiva' }, departamento: 'La Capital', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-lapasajo', _type: 'localidad', titulo: 'Lapasajo', slug: { _type: 'slug', current: 'lapasajo' }, departamento: 'Vera', region: { _type: 'reference', _ref: 'region-chaco-santafesino' } },
    { _id: 'loc-santa-fe', _type: 'localidad', titulo: 'Santa Fe', slug: { _type: 'slug', current: 'santa-fe' }, departamento: 'La Capital', region: { _type: 'reference', _ref: 'region-costa-norte' } },
  ]

  // === PERIODOS ===
  const periodos = [
    { _id: 'per-conquista', _type: 'periodo', titulo: 'Conquista del Chaco', slug: { _type: 'slug', current: 'conquista-del-chaco' }, anioInicio: 1870, anioFin: 1890, unidadSeminario: 'Unidad I', descripcion: 'Ocupación militar del territorio chaqueño y comienzo de la explotación forestal.' },
    { _id: 'per-auge-masacre', _type: 'periodo', titulo: 'Auge industrial y masacre', slug: { _type: 'slug', current: 'auge-industrial-y-masacre' }, anioInicio: 1890, anioFin: 1921, unidadSeminario: 'Unidad II-III', descripcion: 'Expansión de la industria taninera, paternalismo empresarial y la masacre de obreros de 1921.' },
    { _id: 'per-paternalismo-peronismo', _type: 'periodo', titulo: 'Paternalismo autoritario y peronismo', slug: { _type: 'slug', current: 'paternalismo-autoritario-y-peronismo' }, anioInicio: 1922, anioFin: 1952, unidadSeminario: 'Unidad IV', descripcion: 'Consolidación del modelo de company town, emergencia del sindicalismo y el impacto del peronismo.' },
    { _id: 'per-deslocalizacion-exodo', _type: 'periodo', titulo: 'Deslocalización y éxodo', slug: { _type: 'slug', current: 'deslocalizacion-y-exodo' }, anioInicio: 1953, anioFin: 1963, unidadSeminario: 'Unidad V', descripcion: 'Cierre de fábricas, migración del capital a Sudáfrica y despoblamiento de los pueblos forestales.' },
    { _id: 'per-ligas-represion', _type: 'periodo', titulo: 'Ligas Agrarias y represión', slug: { _type: 'slug', current: 'ligas-agrarias-y-represion' }, anioInicio: 1964, anioFin: 1983, unidadSeminario: 'Unidad VI', descripcion: 'Movimiento agrario, radicalización social y terror de Estado durante la última dictadura.' },
    { _id: 'per-memoria-justicia', _type: 'periodo', titulo: 'Memoria y justicia', slug: { _type: 'slug', current: 'memoria-y-justicia' }, anioInicio: 1983, unidadSeminario: 'Unidad VII-VIII', descripcion: 'Luchas por la memoria, la verdad y la reparación de los crímenes de La Forestal.' },
  ]

  // === TIPOS DE DOCUMENTO ===
  const tiposDocumento = [
    { _id: 'tipo-ley', _type: 'tipoDocumento', titulo: 'Ley', slug: { _type: 'slug', current: 'ley' }, color: '#2D5F3E', orden: 1 },
    { _id: 'tipo-decreto', _type: 'tipoDocumento', titulo: 'Decreto', slug: { _type: 'slug', current: 'decreto' }, color: '#1A4A6E', orden: 2 },
    { _id: 'tipo-resolucion', _type: 'tipoDocumento', titulo: 'Resolución', slug: { _type: 'slug', current: 'resolucion' }, color: '#4A3B8F', orden: 3 },
    { _id: 'tipo-medida', _type: 'tipoDocumento', titulo: 'Medida', slug: { _type: 'slug', current: 'medida' }, color: '#8B6914', orden: 4 },
    { _id: 'tipo-protesta', _type: 'tipoDocumento', titulo: 'Protesta', slug: { _type: 'slug', current: 'protesta' }, color: '#8B1A1A', orden: 5 },
    { _id: 'tipo-propuesta', _type: 'tipoDocumento', titulo: 'Propuesta', slug: { _type: 'slug', current: 'propuesta' }, color: '#1A6B6B', orden: 6 },
    { _id: 'tipo-nota', _type: 'tipoDocumento', titulo: 'Nota periodística', slug: { _type: 'slug', current: 'nota-periodistica' }, color: '#6B4A2A', orden: 7 },
    { _id: 'tipo-informe', _type: 'tipoDocumento', titulo: 'Informe / Investigación', slug: { _type: 'slug', current: 'informe-investigacion' }, color: '#5A3B8F', orden: 8 },
  ]

  // === ENTES PRODUCTORES ===
  const entesProductores = [
    { _id: 'ente-la-forestal', _type: 'enteProductor', titulo: 'La Forestal', slug: { _type: 'slug', current: 'la-forestal' }, nombrePopular: 'La Forestal', nombreLegal: 'The Forestal Land, Timber and Railways Company Limited', tipoEnte: 'empresa-privada', orden: 1 },
    { _id: 'ente-quebrachales-fusionados', _type: 'enteProductor', titulo: 'Quebrachales Fusionados S.A.', slug: { _type: 'slug', current: 'quebrachales-fusionados' }, tipoEnte: 'empresa-privada', orden: 2 },
    { _id: 'ente-gob-sf', _type: 'enteProductor', titulo: 'Gobierno de la Provincia de Santa Fe', slug: { _type: 'slug', current: 'gobierno-santa-fe' }, tipoEnte: 'organismo-gubernamental', orden: 3 },
    { _id: 'ente-congreso', _type: 'enteProductor', titulo: 'Congreso de la Nación Argentina', slug: { _type: 'slug', current: 'congreso-nacion' }, tipoEnte: 'organismo-gubernamental', orden: 4 },
    { _id: 'ente-soiq', _type: 'enteProductor', titulo: 'SOIQ', slug: { _type: 'slug', current: 'soiq' }, nombreLegal: 'Sindicato Obrero de la Industria del Quebracho', tipoEnte: 'sindicato', orden: 5 },
    { _id: 'ente-sind-gallareta', _type: 'enteProductor', titulo: 'Sindicato Obrero de La Gallareta', slug: { _type: 'slug', current: 'sindicato-gallareta' }, tipoEnte: 'sindicato', orden: 6 },
    { _id: 'ente-fatita', _type: 'enteProductor', titulo: 'FATITA', slug: { _type: 'slug', current: 'fatita' }, nombreLegal: 'Federación Argentina de Trabajadores de la Industria Taninera y Afines', tipoEnte: 'sindicato', orden: 7 },
    { _id: 'ente-cneq', _type: 'enteProductor', titulo: 'Comisión Nacional del Extracto de Quebracho', slug: { _type: 'slug', current: 'cneq' }, tipoEnte: 'organismo-gubernamental', orden: 8 },
    { _id: 'ente-iapi', _type: 'enteProductor', titulo: 'IAPI', slug: { _type: 'slug', current: 'iapi' }, nombreLegal: 'Instituto Argentino de Promoción del Intercambio', tipoEnte: 'organismo-gubernamental', orden: 9 },
    { _id: 'ente-min-agricultura', _type: 'enteProductor', titulo: 'Ministerio de Agricultura de la Nación', slug: { _type: 'slug', current: 'min-agricultura' }, tipoEnte: 'organismo-gubernamental', orden: 10 },
  ]

  // === TEMAS ===
  const temas = [
    { _id: 'tema-politica-forestal', _type: 'tema', titulo: 'Política forestal / Conservación del bosque', slug: { _type: 'slug', current: 'politica-forestal' }, orden: 1 },
    { _id: 'tema-industria-taninera', _type: 'tema', titulo: 'Industria taninera / Explotación del quebracho', slug: { _type: 'slug', current: 'industria-taninera' }, orden: 2 },
    { _id: 'tema-sindicalizacion', _type: 'tema', titulo: 'Sindicalización / Luchas obreras', slug: { _type: 'slug', current: 'sindicalizacion' }, orden: 3 },
    { _id: 'tema-violencia-empresarial', _type: 'tema', titulo: 'Violencia empresarial / Masacre de 1921', slug: { _type: 'slug', current: 'violencia-empresarial' }, orden: 4 },
    { _id: 'tema-paternalismo', _type: 'tema', titulo: 'Paternalismo industrial / Company town', slug: { _type: 'slug', current: 'paternalismo' }, orden: 5 },
    { _id: 'tema-deslocalizacion', _type: 'tema', titulo: 'Deslocalización / Cierre de fábricas', slug: { _type: 'slug', current: 'deslocalizacion' }, orden: 6 },
    { _id: 'tema-exodo', _type: 'tema', titulo: 'Éxodo demográfico / Pueblos fantasmas', slug: { _type: 'slug', current: 'exodo-demografico' }, orden: 7 },
    { _id: 'tema-ligas-agrarias', _type: 'tema', titulo: 'Ligas Agrarias', slug: { _type: 'slug', current: 'ligas-agrarias' }, orden: 8 },
    { _id: 'tema-represion', _type: 'tema', titulo: 'Represión dictatorial / Terror de Estado', slug: { _type: 'slug', current: 'represion-dictatorial' }, orden: 9 },
    { _id: 'tema-memoria', _type: 'tema', titulo: 'Memoria y patrimonio', slug: { _type: 'slug', current: 'memoria-patrimonio' }, orden: 10 },
    { _id: 'tema-latifundio', _type: 'tema', titulo: 'Latifundio / Concesiones de tierras', slug: { _type: 'slug', current: 'latifundio' }, orden: 11 },
    { _id: 'tema-reforestacion', _type: 'tema', titulo: 'Reforestación / Degüello de árboles', slug: { _type: 'slug', current: 'reforestacion' }, orden: 12 },
  ]

  // === FORMATOS DE SALIDA ===
  const formatosSalida = [
    { _id: 'fmt-texto', _type: 'formatoSalida', titulo: 'Texto breve (ficha)', slug: { _type: 'slug', current: 'texto-breve' }, icono: 'documento', orden: 1 },
    { _id: 'fmt-presentacion', _type: 'formatoSalida', titulo: 'Presentación interactiva (HTML)', slug: { _type: 'slug', current: 'presentacion-interactiva' }, icono: 'monitor', orden: 2 },
    { _id: 'fmt-audio', _type: 'formatoSalida', titulo: 'Audio / Podcast', slug: { _type: 'slug', current: 'audio-podcast' }, icono: 'audio', orden: 3 },
    { _id: 'fmt-video', _type: 'formatoSalida', titulo: 'Video documental', slug: { _type: 'slug', current: 'video-documental' }, icono: 'video', orden: 4 },
    { _id: 'fmt-historia-oral', _type: 'formatoSalida', titulo: 'Historia oral / Testimonio', slug: { _type: 'slug', current: 'historia-oral' }, icono: 'microfono', orden: 5 },
  ]

  // === CREATE ALL ===
  const allDocs = [
    ...regiones,
    ...localidades,
    ...periodos,
    ...tiposDocumento,
    ...entesProductores,
    ...temas,
    ...formatosSalida,
  ]

  let created = 0
  for (const doc of allDocs) {
    try {
      await client.createOrReplace(doc)
      created++
      console.log(`✓ ${doc._type}: ${doc.titulo}`)
    } catch (err: any) {
      console.error(`✗ ${doc._id}: ${err.message}`)
    }
  }

  console.log(`\n${created}/${allDocs.length} taxonomy terms seeded.`)
}

seed().catch(console.error)
