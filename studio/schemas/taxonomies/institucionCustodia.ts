import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'institucionCustodia',
  title: 'Institución de custodia',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Nombre', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (Rule: any) => Rule.required() }),
    defineField({
      name: 'tipo',
      title: 'Tipo de institución',
      type: 'string',
      options: {
        list: [
          { title: 'Archivo público', value: 'archivo-publico' },
          { title: 'Archivo privado', value: 'archivo-privado' },
          { title: 'Museo', value: 'museo' },
          { title: 'Biblioteca', value: 'biblioteca' },
          { title: 'Organismo gubernamental', value: 'organismo-gubernamental' },
          { title: 'Institución académica', value: 'institucion-academica' },
          { title: 'Familia / colección privada', value: 'coleccion-privada' },
          { title: 'Otro', value: 'otro' },
        ],
      },
    }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'ubicacion', title: 'Ubicación', type: 'string', description: 'Ciudad o localidad donde se encuentra la institución' }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'titulo', tipo: 'tipo', ubicacion: 'ubicacion' },
    prepare({ title, tipo, ubicacion }: { title?: string; tipo?: string; ubicacion?: string }) {
      return { title, subtitle: [tipo, ubicacion].filter(Boolean).join(' · ') }
    },
  },
})
