import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'periodo',
  title: 'Período / Sub-período',
  type: 'document',
  fields: [
    defineField({
      name: 'nivel',
      title: 'Nivel',
      type: 'string',
      description: 'Si es Período (nivel superior) o Sub-período (anidado dentro de un Período u otro Sub-período)',
      options: {
        list: [
          { title: 'Período', value: 'periodo' },
          { title: 'Sub-período', value: 'subperiodo' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: 'periodo',
    }),
    defineField({
      name: 'periodoPadre',
      title: 'Período padre',
      type: 'reference',
      to: [{ type: 'periodo' }],
      description: 'Obligatorio si es Sub-período. Indica dentro de qué Período o Sub-período se anida.',
      validation: (Rule: any) =>
        Rule.custom((padre: any, context: any) => {
          const nivel = context.document?.nivel
          if (nivel === 'subperiodo' && !padre) {
            return 'Un Sub-período debe tener un Período padre'
          }
          if (nivel === 'periodo' && padre) {
            return 'Un Período no debe tener padre (los Sub-períodos sí)'
          }
          return true
        }),
      options: {
        filter: ({ document }: { document: any }) => {
          // Only show items that are NOT the current document (avoid self-reference)
          const currentId = document?._id?.replace('drafts.', '')
          return {
            filter: currentId ? '_id != $currentId' : '',
            params: currentId ? { currentId } : {},
          }
        },
      },
      hidden: ({ document }: { document: any }) => document?.nivel === 'periodo',
    }),
    defineField({ name: 'titulo', title: 'Nombre', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'nombrePopular', title: 'Nombre popular', type: 'string', description: 'Ej: "La era del tanino", "Los años forestales"' }),
    defineField({ name: 'nombreOriginal', title: 'Nombres en archivos', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'anioInicio', title: 'Año inicio', type: 'number', description: 'Año aproximado de inicio del período' }),
    defineField({ name: 'anioFin', title: 'Año fin', type: 'number' }),
    defineField({
      name: 'unidadSeminario',
      title: 'Unidad del seminario',
      type: 'string',
      description: 'Referencia a la unidad del programa académico (ej: "Unidad III")',
    }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'titulo', nivel: 'nivel', inicio: 'anioInicio', fin: 'anioFin', padre: 'periodoPadre' },
    prepare({ title, nivel, inicio, fin, padre }: { title?: string; nivel?: string; inicio?: number; fin?: number; padre?: any }) {
      const range = inicio ? `${inicio}${fin ? `-${fin}` : '+'}` : ''
      const prefix = nivel === 'subperiodo' ? '↳ ' : ''
      const parentLabel = padre ? ` (en ${padre.titulo || '...'})` : ''
      return { title: prefix + title, subtitle: range + parentLabel }
    },
  },
})
