import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localidad',
  title: 'Pueblo o localidad',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Nombre', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'nombrePopular', title: 'Nombre popular', type: 'string' }),
    defineField({ name: 'nombreOriginal', title: 'Nombres en archivos', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'region',
      title: 'Región',
      type: 'reference',
      to: [{ type: 'region' }],
      description: 'Región a la que pertenece esta localidad',
    }),
    defineField({ name: 'coordenadas', title: 'Coordenadas', type: 'geopoint' }),
    defineField({
      name: 'departamento',
      title: 'Departamento',
      type: 'string',
      description: 'Departamento provincial (ej: General Obligado)',
    }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'titulo', popular: 'nombrePopular', depto: 'departamento' },
    prepare({ title, popular, depto }: { title?: string; popular?: string; depto?: string }) {
      return { title, subtitle: [popular, depto].filter(Boolean).join(' · ') }
    },
  },
})
