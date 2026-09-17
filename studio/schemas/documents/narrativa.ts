import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'narrativa',
  title: 'Narrativa',
  type: 'document',
  fields: [
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
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      description: 'Breve resumen para cards y listados',
    }),
    defineField({
      name: 'contenido',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texto narrativo. Las fichas de documentos se vinculan por referencia, no se embeben.',
    }),
    // Explicit document references (bidirectional with documento.narrativa)
    defineField({
      name: 'documentos',
      title: 'Documentos referenciados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'documento' }] }],
      description: 'Documentos que esta narrativa contextualiza o referencia',
    }),
    // Catálogos (prefijadas: solo selección)
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
    // Etiqueta (creable al cargar)
    defineField({
      name: 'temas',
      title: 'Temas',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tema' }] }],
    }),
    defineField({
      name: 'actores',
      title: 'Actores mencionados',
      type: 'array',
      of: [{ type: 'actorConRol' }],
    }),
    defineField({
      name: 'imagenPortada',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'encuentroSeminario',
      title: 'Encuentro del seminario',
      type: 'string',
      description: 'Encuentro del seminario al que pertenece esta narrativa (ej: "Encuentro 3")',
    }),
  ],
  preview: {
    select: { titulo: 'titulo', subtitulo: 'subtitulo', encuentro: 'encuentroSeminario' },
    prepare({ titulo, subtitulo, encuentro }: { titulo?: string; subtitulo?: string; encuentro?: string }) {
      return {
        title: titulo,
        subtitle: [encuentro, subtitulo].filter(Boolean).join(' · '),
      }
    },
  },
})
