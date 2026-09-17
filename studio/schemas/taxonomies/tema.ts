import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tema',
  title: 'Tema',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Nombre', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'nombrePopular', title: 'Nombre popular', type: 'string' }),
    defineField({ name: 'nombreOriginal', title: 'Nombres en archivos', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'titulo', popular: 'nombrePopular' },
    prepare({ title, popular }: { title?: string; popular?: string }) {
      return { title, subtitle: popular || undefined }
    },
  },
})
