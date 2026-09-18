import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    // === HOME: Documento destacado ===
    defineField({
      name: 'destacadoDocumento',
      title: 'Documento destacado',
      type: 'reference',
      to: [{ type: 'documento' }],
      description: 'Documento que aparece en la portada del sitio. Solo uno a la vez. El título, bajada y referencia se toman del documento.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destacadoImagen',
      title: 'Imagen del destacado',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen con tratamiento de color para la portada. TIENE PRIORIDAD sobre la imagen de portada del documento. Si queda vacía, usa la imagen de portada del documento.',
    }),
  ],
  preview: {
    select: {
      documentoTitulo: 'destacadoDocumento.titulo',
    },
    prepare({ documentoTitulo }: {
      documentoTitulo?: string
    }) {
      return {
        title: documentoTitulo || 'Sin destacado',
      }
    },
  },
})
