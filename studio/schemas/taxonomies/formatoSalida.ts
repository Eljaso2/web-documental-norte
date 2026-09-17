import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'formatoSalida',
  title: 'Formato de salida',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Nombre', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'nombrePopular', title: 'Nombre popular', type: 'string' }),
    defineField({
      name: 'icono',
      title: 'Icono',
      type: 'string',
      description: 'Nombre de icono para la UI (ej: "documento", "audio", "video")',
    }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'titulo', icono: 'icono' },
    prepare({ title, icono }: { title?: string; icono?: string }) {
      return { title, subtitle: icono || undefined }
    },
  },
})
