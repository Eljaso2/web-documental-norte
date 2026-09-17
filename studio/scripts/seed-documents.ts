import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '06aqvaal',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function seed() {
  console.log('Seeding actors and documents...\n')

  // === ACTORES ===
  const actores = [
    { _id: 'actor-la-forestal', _type: 'actor', nombre: 'La Forestal', slug: { _type: 'slug', current: 'la-forestal' }, tipoActor: 'organizacion', nombreAlternativo: 'La Forestal', nombreLegal: 'The Forestal Land, Timber and Railways Company Limited', descripcion: 'Empresa británica que dominó la industria taninera del norte santafesino entre 1906 y 1963. Controló extensos territorios, fábricas, ferrocarriles y pueblos enteros bajo un régimen de paternalismo autoritario.' },
    { _id: 'actor-harteneck', _type: 'actor', nombre: 'Carl Harteneck', slug: { _type: 'slug', current: 'carl-harteneck' }, tipoActor: 'persona', nombreAlternativo: 'Harteneck padre', descripcion: 'Director general de La Forestal en Argentina. Figura central del paternalismo empresarial y responsable de las políticas de represión laboral.' },
    { _id: 'actor-lamazon', _type: 'actor', nombre: 'Rogelio Lamazon', slug: { _type: 'slug', current: 'rogelio-lamazon' }, tipoActor: 'persona', descripcion: 'Líder sindical asesinado durante la represión de la huelga de 1921 en el norte santafesino.' },
    { _id: 'actor-niklison', _type: 'actor', nombre: 'José Elías Niklison', slug: { _type: 'slug', current: 'jose-elias-niklison' }, tipoActor: 'persona', descripcion: 'Inspector del Departamento Nacional del Trabajo. Visitó los obrajes de La Forestal en 1919-1920 y documentó las condiciones de explotación.' },
    { _id: 'actor-gervasoni', _type: 'actor', nombre: 'José Gervasoni', slug: { _type: 'slug', current: 'jose-gervasoni' }, tipoActor: 'persona', descripcion: 'Autor de "Los grandes latifundios en Santa Fe" (1935), investigación fundamental sobre la concentración de tierras en poder de La Forestal.' },
    { _id: 'actor-gendarmeria', _type: 'actor', nombre: 'Gendarmería Nacional', slug: { _type: 'slug', current: 'gendarmeria-nacional' }, tipoActor: 'fuerza-seguridad', descripcion: 'Fuerza de seguridad que participó en la represión de huelgas y conflictos laborales en los obrajes y fábricas de La Forestal.' },
    { _id: 'actor-soiq', _type: 'actor', nombre: 'SOIQ', slug: { _type: 'slug', current: 'soiq' }, tipoActor: 'organizacion', nombreLegal: 'Sindicato Obrero de la Industria del Quebracho', descripcion: 'Sindicato que representó a los trabajadores de la industria taninera. Organizó huelgas y enfrentó la represión empresarial y estatal.' },
    { _id: 'actor-marina-harteneck', _type: 'actor', nombre: 'Marina Harteneck', slug: { _type: 'slug', current: 'marina-harteneck' }, tipoActor: 'persona', descripcion: 'Bisnieta de Carl Harteneck. Reconstruyó la memoria familiar de La Forestal desde la perspectiva del descendiente del fundador.' },
    { _id: 'actor-doldan', _type: 'actor', nombre: 'Hermanos Doldán', slug: { _type: 'slug', current: 'hermanos-doldan' }, tipoActor: 'persona', descripcion: 'Legisladores santafesinos que presentaron proyectos de ley para declarar zona forestal de utilidad pública y regular la explotación del quebracho.' },
    { _id: 'actor-comision-intercamarista', _type: 'actor', nombre: 'Comisión Intercamarista Permanente', slug: { _type: 'slug', current: 'comision-intercamarista' }, tipoActor: 'institucion-estatal', descripcion: 'Comisión parlamentaria que investigó las irregularidades en las concesiones de tierras a La Forestal en Santa Fe.' },
  ]

  // === DOCUMENTOS (from politica-forestal-tabla.html chronology) ===
  const documentos = [
    {
      _id: 'doc-1880-primera-ley',
      _type: 'documento',
      titulo: 'Primera ley que prohíbe el corte sin permiso',
      slug: { _type: 'slug', current: 'primera-ley-prohibicion-corte-1880' },
      descripcion: 'Se sanciona una primera ley que prohibía el corte sin permiso y limitaba la actividad al invierno. Pocos años después, se atribuyeron las primeras funciones a los fiscales y se exigió estudios técnicos para proceder con políticas de conservación y replantios, para evitar el agotamiento.',
      fecha: { _type: 'fechaRango', fechaInicio: '1880-01-01', fechaDisplay: '1880', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-ley', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-conquista', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-politica-forestal', _key: 'a' }, { _type: 'reference', _ref: 'tema-reforestacion', _key: 'b' }],
      entesProductores: [{ _type: 'reference', _ref: 'ente-gob-sf', _key: 'a' }],
      nivelAcceso: 'publico',
      fuenteArchivo: 'Peri et al. 134; Zarrilli',
    },
    {
      _id: 'doc-1889-ley-fiscal-bosques',
      _type: 'documento',
      titulo: 'Ley de Fiscales de Bosques y Tierras Públicas',
      slug: { _type: 'slug', current: 'ley-fiscales-bosques-1889' },
      descripcion: 'Se crea la figura del fiscal de bosques con funciones de vigilancia y control del corte de madera en tierras fiscales. Primer intento orgánico de regular la explotación forestal.',
      fecha: { _type: 'fechaRango', fechaInicio: '1889-01-01', fechaDisplay: '1889', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-ley', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-conquista', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-politica-forestal', _key: 'a' }, { _type: 'reference', _ref: 'tema-latifundio', _key: 'b' }],
      entesProductores: [{ _type: 'reference', _ref: 'ente-gob-sf', _key: 'a' }],
      nivelAcceso: 'publico',
      fuenteArchivo: 'Peri et al.',
    },
    {
      _id: 'doc-1906-forestal-quebracho',
      _type: 'documento',
      titulo: 'The Forestal adquiere Quebrachales Fusionados',
      slug: { _type: 'slug', current: 'forestal-quebrachales-fusionados-1906' },
      descripcion: 'La empresa británica The Forestal Land, Timber and Railways Company Limited adquiere Quebrachales Fusionados S.A., consolidando el monopolio sobre la industria del extracto de quebracho en el norte santafesino.',
      fecha: { _type: 'fechaRango', fechaInicio: '1906-01-01', fechaDisplay: '1906', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-nota', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-auge-masacre', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-industria-taninera', _key: 'a' }, { _type: 'reference', _ref: 'tema-latifundio', _key: 'b' }],
      entesProductores: [{ _type: 'reference', _ref: 'ente-la-forestal', _key: 'a' }],
      actores: [{ _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-la-forestal' }, rol: 'autor-productor', _key: 'a' }],
      nivelAcceso: 'publico',
    },
    {
      _id: 'doc-1919-niklison-informe',
      _type: 'documento',
      titulo: 'Informe de Niklison sobre condiciones de trabajo en los obrajes',
      slug: { _type: 'slug', current: 'informe-niklison-obrajes-1919' },
      descripcion: 'El inspector del Departamento Nacional del Trabajo José Elías Niklison visita los obrajes de La Forestal y documenta las condiciones de explotación, las restricciones a la libertad de los trabajadores y el régimen de compañía.',
      fecha: { _type: 'fechaRango', fechaInicio: '1919-01-01', fechaDisplay: '1919-1920', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-informe', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-auge-masacre', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      localidades: [{ _type: 'reference', _ref: 'loc-la-gallareta', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-violencia-empresarial', _key: 'a' }, { _type: 'reference', _ref: 'tema-paternalismo', _key: 'b' }],
      entesProductores: [{ _type: 'reference', _ref: 'ente-gob-sf', _key: 'a' }],
      actores: [{ _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-niklison' }, rol: 'fiscal-investigador', _key: 'a' }, { _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-la-forestal' }, rol: 'empresa-desalojo', _key: 'b' }],
      nivelAcceso: 'publico',
      fuenteArchivo: 'Departamento Nacional del Trabajo',
    },
    {
      _id: 'doc-1921-masacre-huelga',
      _type: 'documento',
      titulo: 'La masacre de obreros en huelga',
      slug: { _type: 'slug', current: 'masacre-huelga-1921' },
      descripcion: 'Durante la huelga de trabajadores de la industria del quebracho, fuerzas represivas al servicio de La Forestal masacran obreros en los obrajes del norte santafesino. Rogelio Lamazon, líder sindical, es asesinado. El episodio marca el clímax de la violencia empresarial en la región.',
      fecha: { _type: 'fechaRango', fechaInicio: '1921-01-01', fechaDisplay: '1921', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-protesta', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-auge-masacre', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-violencia-empresarial', _key: 'a' }, { _type: 'reference', _ref: 'tema-sindicalizacion', _key: 'b' }],
      actores: [
        { _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-la-forestal' }, rol: 'empresa-desalojo', _key: 'a' },
        { _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-gendarmeria' }, rol: 'fuerza-represiva', _key: 'b' },
        { _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-lamazon' }, rol: 'organizador-huelga', _key: 'c' },
        { _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-soiq' }, rol: 'sindicato', _key: 'd' },
      ],
      nivelAcceso: 'publico',
    },
    {
      _id: 'doc-1933-convenio-colectivo',
      _type: 'documento',
      titulo: 'Primer convenio colectivo de la industria del quebracho',
      slug: { _type: 'slug', current: 'convenio-colectivo-quebracho-1933' },
      descripcion: 'Se firma el primer convenio colectivo de trabajo para la industria del extracto de quebracho, estableciendo condiciones laborales mínimas tras décadas de explotación sin regulación.',
      fecha: { _type: 'fechaRango', fechaInicio: '1933-01-01', fechaDisplay: '1933', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-ley', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-paternalismo-peronismo', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-sindicalizacion', _key: 'a' }],
      entesProductores: [{ _type: 'reference', _ref: 'ente-soiq', _key: 'a' }, { _type: 'reference', _ref: 'ente-la-forestal', _key: 'b' }],
      actores: [
        { _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-soiq' }, rol: 'sindicato', _key: 'a' },
        { _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-la-forestal' }, rol: 'autor-productor', _key: 'b' },
      ],
      nivelAcceso: 'publico',
    },
    {
      _id: 'doc-1935-gervasoni-latifundios',
      _type: 'documento',
      titulo: 'Los grandes latifundios en Santa Fe',
      slug: { _type: 'slug', current: 'gervasoni-latifundios-santa-fe-1935' },
      descripcion: 'José Gervasoni publica su investigación sobre la concentración de tierras en la provincia de Santa Fe, denunciando que La Forestal controlaba más de un millón de hectáreas de bosque.',
      fecha: { _type: 'fechaRango', fechaInicio: '1935-01-01', fechaDisplay: '1935', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-informe', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-paternalismo-peronismo', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-latifundio', _key: 'a' }],
      actores: [{ _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-gervasoni' }, rol: 'fiscal-investigador', _key: 'a' }],
      nivelAcceso: 'publico',
      fuenteArchivo: 'Gervasoni, J. (1935). Los grandes latifundios en Santa Fe.',
    },
    {
      _id: 'doc-1944-peron-ley-bosques',
      _type: 'documento',
      titulo: 'Decreto del Poder Ejecutivo sobre defensa y conservación del bosque',
      slug: { _type: 'slug', current: 'decreto-defensa-bosque-1944' },
      descripcion: 'El gobierno peronista dicta un decreto estableciendo medidas de defensa y conservación del bosque, incluyendo la obligación de reforestar y limitaciones al corte. Representa un giro en la política forestal nacional.',
      fecha: { _type: 'fechaRango', fechaInicio: '1944-01-01', fechaDisplay: '1944', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-decreto', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-paternalismo-peronismo', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-politica-forestal', _key: 'a' }, { _type: 'reference', _ref: 'tema-reforestacion', _key: 'b' }],
      entesProductores: [{ _type: 'reference', _ref: 'ente-congreso', _key: 'a' }],
      nivelAcceso: 'publico',
    },
    {
      _id: 'doc-1949-carta-abierta-expulsados',
      _type: 'documento',
      titulo: 'Carta abierta de obreros expulsados',
      slug: { _type: 'slug', current: 'carta-abierta-obreros-expulsados-1949' },
      descripcion: 'Obreros expulsados de las fábricas de La Forestal publican una carta abierta denunciando los despidos masivos y las condiciones de abandono en que queda la población de los pueblos forestales.',
      fecha: { _type: 'fechaRango', fechaInicio: '1949-01-01', fechaDisplay: '1949', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-protesta', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-paternalismo-peronismo', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-deslocalizacion', _key: 'a' }, { _type: 'reference', _ref: 'tema-sindicalizacion', _key: 'b' }],
      actores: [{ _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-la-forestal' }, rol: 'empresa-desalojo', _key: 'a' }],
      nivelAcceso: 'publico',
    },
    {
      _id: 'doc-1954-ley-forestal-nacional',
      _type: 'documento',
      titulo: 'Ley Nacional de bosques y tierras forestales',
      slug: { _type: 'slug', current: 'ley-forestal-nacional-1954' },
      descripcion: 'Se sanciona la Ley 13.273 de bosques y tierras forestales, que establece un régimen de protección y conservación de los bosques nativos. La Forestal se opone activamente a su implementación.',
      fecha: { _type: 'fechaRango', fechaInicio: '1954-01-01', fechaDisplay: '1954', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-ley', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-deslocalizacion-exodo', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-politica-forestal', _key: 'a' }, { _type: 'reference', _ref: 'tema-reforestacion', _key: 'b' }],
      entesProductores: [{ _type: 'reference', _ref: 'ente-congreso', _key: 'a' }],
      nivelAcceso: 'publico',
      fuenteArchivo: 'Boletín Oficial',
    },
    {
      _id: 'doc-1960-marzorati-mimosa',
      _type: 'documento',
      titulo: 'La Forestal se ha divorciado del quebracho y se ha ido con la mimosa',
      slug: { _type: 'slug', current: 'marzorati-mimosa-1960' },
      descripcion: 'Ricardo Marzorati publica "La industria del extracto de quebracho en la Argentina", denunciando que La Forestal abandonó el quebracho para dedicarse a la mimosa sudafricana, manteniendo sin embargo el control sobre los recursos locales.',
      fecha: { _type: 'fechaRango', fechaInicio: '1960-01-01', fechaDisplay: '1960', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-informe', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-deslocalizacion-exodo', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      temas: [{ _type: 'reference', _ref: 'tema-industria-taninera', _key: 'a' }, { _type: 'reference', _ref: 'tema-deslocalizacion', _key: 'b' }],
      actores: [{ _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-la-forestal' }, rol: 'autor-productor', _key: 'a' }],
      nivelAcceso: 'publico',
    },
    {
      _id: 'doc-1963-cierre-fabricas',
      _type: 'documento',
      titulo: 'Cierre de las últimas fábricas de extracto de quebracho',
      slug: { _type: 'slug', current: 'cierre-fabricas-extracto-1963' },
      descripcion: 'La Forestal cierra sus últimas fábricas de extracto de quebracho en el norte santafesino, completando el proceso de deslocalización iniciado una década antes. Los pueblos forestales quedan devastados.',
      fecha: { _type: 'fechaRango', fechaInicio: '1963-01-01', fechaDisplay: '1963', circa: false },
      tiposDocumento: [{ _type: 'reference', _ref: 'tipo-nota', _key: 'a' }],
      periodos: [{ _type: 'reference', _ref: 'per-deslocalizacion-exodo', _key: 'a' }],
      regiones: [{ _type: 'reference', _ref: 'region-chaco-santafesino', _key: 'a' }],
      localidades: [{ _type: 'reference', _ref: 'loc-villa-guillermina', _key: 'a' }, { _type: 'reference', _ref: 'loc-villa-ana', _key: 'b' }],
      temas: [{ _type: 'reference', _ref: 'tema-deslocalizacion', _key: 'a' }, { _type: 'reference', _ref: 'tema-exodo', _key: 'b' }],
      actores: [{ _type: 'actorConRol', actor: { _type: 'reference', _ref: 'actor-la-forestal' }, rol: 'empresa-desalojo', _key: 'a' }],
      nivelAcceso: 'publico',
    },
  ]

  // Create all
  let created = 0
  const allDocs = [...actores, ...documentos]

  for (const doc of allDocs) {
    try {
      await client.createOrReplace(doc)
      created++
      console.log(`✓ ${doc._type}: ${doc.nombre || doc.titulo}`)
    } catch (err: any) {
      console.error(`✗ ${doc._id}: ${err.message}`)
    }
  }

  console.log(`\n${created}/${allDocs.length} documents seeded.`)
}

seed().catch(console.error)
