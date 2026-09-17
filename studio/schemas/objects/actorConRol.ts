import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'actorConRol',
  title: 'Actor con rol',
  type: 'object',
  fields: [
    defineField({
      name: 'actor',
      title: 'Actor',
      type: 'reference',
      to: [{ type: 'actor' }],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'rol',
      title: 'Rol',
      type: 'string',
      options: {
        list: [
          { title: 'Empresa responsable de desalojos', value: 'empresa-desalojo' },
          { title: 'Fuerza represiva', value: 'fuerza-represiva' },
          { title: 'Organizador de huelga', value: 'organizador-huelga' },
          { title: 'Sindicato', value: 'sindicato' },
          { title: 'Autor / productor del documento', value: 'autor-productor' },
          { title: 'Destinatario', value: 'destinatario' },
          { title: 'Legislador', value: 'legislador' },
          { title: 'Fiscal / investigador', value: 'fiscal-investigador' },
          { title: 'Testigo', value: 'testigo' },
          { title: 'Otro', value: 'otro' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'rolDetalle',
      title: 'Detalle del rol',
      type: 'string',
      description: 'Descripción libre si el rol no está en la lista o requiere matiz',
    }),
  ],
  preview: {
    select: { actorTitle: 'actor.nombre', rol: 'rol', detalle: 'rolDetalle' },
    prepare({ actorTitle, rol, detalle }: { actorTitle?: string; rol?: string; detalle?: string }) {
      const rolLabel = rol ? rol.replace(/-/g, ' ') : 'Sin rol'
      return {
        title: actorTitle || 'Sin actor',
        subtitle: detalle || rolLabel,
      }
    },
  },
})
