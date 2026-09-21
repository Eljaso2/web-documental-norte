import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'documento',
  title: 'Documento',
  type: 'document',
  groups: [
    { name: 'narrativa', title: 'Narrativa del documento', icon: () => '📖' },
  ],
  fields: [
    // === BLOQUE 1: IDENTIFICACION (ISAD-G) ===
    defineField({
      name: 'codigoReferencia',
      title: 'Código de referencia',
      type: 'string',
      description: 'Identificador único archivístico (ISAD-G). Formato: AR-HN-[institución]-[correlativo]. Ej: AR-HN-SEMPERM-000123',
    }),
    defineField({
      name: 'nivelDescripcion',
      title: 'Nivel de descripción',
      type: 'string',
      description: 'Posición jerárquica del item en el archivo (ISAD-G). La mayoría de las cargas iniciales son "pieza suelta".',
      options: {
        list: [
          { title: 'Fondo', value: 'fondo' },
          { title: 'Serie', value: 'serie' },
          { title: 'Unidad documental compuesta', value: 'unidad-compuesta' },
          { title: 'Unidad documental simple (pieza suelta)', value: 'pieza-suelta' },
        ],
      },
      initialValue: 'pieza-suelta',
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titulo', maxLength: 120 },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Alcance y contenido',
      type: 'text',
      rows: 4,
      description: 'Descripción curada del documento (ISAD-G campo 9). Sin narrativa: solo datos y contexto.',
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha(s)',
      type: 'fechaRango',
      description: 'Fecha del documento. Usar "Fecha para mostrar" para textos como "c. 1903" o "Fines de 1920".',
    }),
    defineField({
      name: 'soporteOriginal',
      title: 'Soporte / formato original',
      type: 'string',
      description: 'Medio físico o digital en que existe el documento originalmente (ISAD-G campo 5). Distinto de "Formato de salida" (presentación en frontend).',
      options: {
        list: [
          { title: 'Papel', value: 'papel' },
          { title: 'Fotografía', value: 'fotografia' },
          { title: 'Cinta magnética', value: 'cinta-magnetica' },
          { title: 'Vidrio (placa fotográfica)', value: 'vidrio' },
          { title: 'Digital nativo', value: 'digital-nativo' },
          { title: 'Otro', value: 'otro' },
        ],
      },
    }),
    defineField({
      name: 'idioma',
      title: 'Idioma',
      type: 'string',
      description: 'Idioma en que está escrito o hablado el documento (ISAD-G campo 10).',
      options: {
        list: [
          { title: 'Español', value: 'es' },
          { title: 'Inglés', value: 'en' },
          { title: 'Italiano', value: 'it' },
          { title: 'Portugués', value: 'pt' },
          { title: 'Alemán', value: 'de' },
          { title: 'Francés', value: 'fr' },
          { title: 'Guaraní', value: 'gn' },
          { title: 'Otro', value: 'otro' },
        ],
      },
      initialValue: 'es',
    }),
    // Catálogos (prefijadas: solo selección, no se crean desde acá)
    defineField({
      name: 'regiones',
      title: 'Regiones',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'region' }], options: { disableNew: true } }],
    }),
    defineField({
      name: 'localidades',
      title: 'Localidades',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'localidad' }], options: { disableNew: true } }],
    }),
    defineField({
      name: 'periodos',
      title: 'Períodos históricos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'periodo' }], options: { disableNew: true } }],
    }),
    // Etiquetas (creables al cargar: autocomplete + crear nuevo inline)
    defineField({
      name: 'tiposDocumento',
      title: 'Tipos de documento',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tipoDocumento' }] }],
      validation: (Rule: any) => Rule.required().min(1),
    }),
    defineField({
      name: 'entesProductores',
      title: 'Entes productores',
      type: 'array',
      of: [{ type: 'actorConRol' }],
      description: 'Actor(es) que produjeron el documento (ISAD-G campo 7). Mismo listado que Actores involucrados.',
    }),
    defineField({
      name: 'institucionCustodia',
      title: 'Institución actual / custodia',
      type: 'reference',
      to: [{ type: 'institucionCustodia' }],
      options: { disableNew: true },
      description: 'Quien tiene el documento guardado hoy (ISAD-G campo 7). Puede coincidir con el ente productor o ser distinta.',
    }),
    defineField({
      name: 'historiaArchivistica',
      title: 'Historia archivística',
      type: 'text',
      rows: 3,
      description: 'Cómo llegó el documento a donde está hoy: donación, compra, transferencia, hallazgo (ISAD-G campo 8).',
    }),
    defineField({
      name: 'temas',
      title: 'Temas',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tema' }] }],
    }),
    defineField({
      name: 'formatosSalida',
      title: 'Formatos de salida',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'formatoSalida' }], options: { disableNew: true } }],
    }),
    // Politicized provenance (Digital Benin pattern)
    defineField({
      name: 'actores',
      title: 'Actores involucrados',
      type: 'array',
      of: [{ type: 'actorConRol' }],
      description: 'Personas u organizaciones con rol en la producción o contenido del documento',
    }),
    // === NARRATIVA DEL DOCUMENTO ===
    defineField({
      name: 'destacadoVolanta',
      title: 'Volanta',
      type: 'string',
      group: 'narrativa',
      description: 'Texto chico arriba del título cuando el documento se destaca (ej: "Archivo destacado", "Fuentes primarias").',
      initialValue: 'Archivo destacado',
    }),
    defineField({
      name: 'destacadoTitulo',
      title: 'Título para destacar',
      type: 'string',
      group: 'narrativa',
      description: 'Título narrativo para cuando el documento se destaca. Si queda vacío, usa el título del documento.',
    }),
    defineField({
      name: 'destacadoBajada',
      title: 'Bajada',
      type: 'text',
      rows: 5,
      group: 'narrativa',
      description: 'Descripción narrativa cuando el documento se destaca. Si queda vacía, usa la descripción ISAD-G.',
    }),
    defineField({
      name: 'destacadoRefAutor',
      title: 'Para saber más — Autor',
      type: 'string',
      group: 'narrativa',
      description: 'Autor de la obra fuente (ej: "Gori, Gastón").',
    }),
    defineField({
      name: 'destacadoRefObra',
      title: 'Para saber más — Obra',
      type: 'string',
      group: 'narrativa',
      description: 'Título de la obra fuente (ej: "La Forestal: la tragedia del quebracho colorado").',
    }),
    defineField({
      name: 'destacadoRefAnio',
      title: 'Para saber más — Año',
      type: 'string',
      group: 'narrativa',
      description: 'Año de publicación (ej: "1965", "c. 1964").',
    }),
    defineField({
      name: 'destacadoRefPaginas',
      title: 'Para saber más — Página/s',
      type: 'string',
      group: 'narrativa',
      description: 'Página o rango de páginas (ej: "p. 45", "pp. 45-52").',
    }),
    // Digital assets
    defineField({
      name: 'imagenPortada',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      description: 'Primera página o cara visible del documento. Se usa como thumbnail en listados y catálogo.',
    }),
    defineField({
      name: 'archivos',
      title: 'Archivos digitales',
      type: 'array',
      of: [{ type: 'image' }, { type: 'file' }],
      description: 'Imágenes, PDFs, u otros archivos adjuntos al documento',
    }),
    defineField({
      name: 'enlacesAudiovisuales',
      title: 'Audiovisual externo',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'url',
            title: 'URL del video o audio',
            type: 'url',
            description: 'YouTube, Vimeo, o cualquier URL con reproductor embebible',
            validation: (Rule: any) => Rule.required(),
          }),
          defineField({
            name: 'titulo',
            title: 'Título del recurso',
            type: 'string',
            description: 'Ej: "Documental Hacheronomas (1966)"',
          }),
          defineField({
            name: 'plataforma',
            title: 'Plataforma',
            type: 'string',
            options: {
              list: [
                { title: 'YouTube', value: 'youtube' },
                { title: 'Vimeo', value: 'vimeo' },
                { title: 'Otra (iframe genérico)', value: 'otra' },
              ],
            },
          }),
        ],
        preview: {
          select: { titulo: 'titulo', url: 'url', plataforma: 'plataforma' },
          prepare({ titulo, url, plataforma }: { titulo?: string; url?: string; plataforma?: string }) {
            return { title: titulo || url || 'Sin título', subtitle: plataforma || 'Externo' }
          },
        },
      }],
      description: 'Videos o audios alojados en plataformas externas (YouTube, Vimeo, etc.)',
    }),
    // Access level
    defineField({
      name: 'nivelAcceso',
      title: 'Nivel de acceso',
      type: 'string',
      options: {
        list: [
          { title: 'Público', value: 'publico' },
          { title: 'Restringido', value: 'restringido' },
          { title: 'Confidencial', value: 'confidencial' },
        ],
      },
      initialValue: 'publico',
      validation: (Rule: any) => Rule.required(),
    }),
    // Narrative link (explicit, not embedded)
    defineField({
      name: 'narrativa',
      title: 'Narrativa asociada',
      type: 'reference',
      to: [{ type: 'narrativa' }],
      description: 'Narrativa que contextualiza este documento (vínculo explícito, no narrativa embebida)',
    }),
    // Transcription
    defineField({
      name: 'transcripcion',
      title: 'Transcripción',
      type: 'text',
      rows: 6,
      description: 'Transcripción textual del documento (si aplica)',
    }),

    // === CAPA ARCHIVO DE ORIGEN (raw layer - never alter) ===
    defineField({
      name: 'fuenteArchivo',
      title: 'Archivo de origen',
      type: 'string',
      description: 'Nombre del archivo o fondo de donde proviene el documento (ej: "Archivo General de la Provincia de Santa Fe")',
    }),
    defineField({
      name: 'referenciaArchivo',
      title: 'Referencia del archivo',
      type: 'string',
      description: 'Signatura o referencia dentro del archivo de origen (ej: "Exp. N 20, 1921")',
    }),
    defineField({
      name: 'datosOriginales',
      title: 'Datos originales del archivo',
      type: 'array',
      of: [{ type: 'datoOriginal' }],
      description: 'Datos tal cual aparecen en el archivo de origen. Nunca alterar una vez ingresados.',
    }),
  ],
  preview: {
    select: {
      titulo: 'titulo',
      codigo: 'codigoReferencia',
      fechaDisplay: 'fecha.fechaDisplay',
      fechaInicio: 'fecha.fechaInicio',
      tipo0: 'tiposDocumento.0.titulo',
      imagen: 'imagenPortada',
    },
    prepare({ titulo, codigo, fechaDisplay, fechaInicio, tipo0, imagen }: { titulo?: string; codigo?: string; fechaDisplay?: string; fechaInicio?: string; tipo0?: string; imagen?: any }) {
      return {
        title: titulo,
        subtitle: [codigo, tipo0, fechaDisplay || fechaInicio].filter(Boolean).join(' · '),
        media: imagen,
      }
    },
  },
})
