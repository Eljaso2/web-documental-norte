import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tipoDocumento',
  title: 'Tipo de documento',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Nombre', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'nombrePopular', title: 'Nombre popular', type: 'string' }),
    defineField({ name: 'nombreOriginal', title: 'Nombres en archivos', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'color',
      title: 'Color (para badges/UI)',
      type: 'string',
      description: 'Hex color para representar este tipo en la UI (ej: "#2D5F3E" para Ley)',
    }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'titulo', color: 'color' },
    prepare({ title, color }: { title?: string; color?: string }) {
      return { title, subtitle: color || undefined }
    },
  },
})
