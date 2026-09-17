import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'region',
  title: 'Región / Zona',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Nombre', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({
      name: 'nombrePopular',
      title: 'Nombre popular',
      type: 'string',
      description: 'Nombre de uso corriente (ej: "La Cuña Boscosa" para la región forestal)',
    }),
    defineField({
      name: 'nombreOriginal',
      title: 'Nombres en archivos',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Denominaciones tal como aparecen en documentos de época (una por entrada)',
    }),
    defineField({ name: 'coordenadas', title: 'Coordenadas centro', type: 'geopoint' }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', hidden: true }),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: {
    select: { title: 'titulo', popular: 'nombrePopular' },
    prepare({ title, popular }: { title?: string; popular?: string }) {
      return { title, subtitle: popular ? `También: ${popular}` : undefined }
    },
  },
})
