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

    // === CATÁLOGO: Documento destacado ===
    defineField({
      name: 'catalogoDestacadoDocumento',
      title: 'Documento destacado del catálogo',
      type: 'reference',
      to: [{ type: 'documento' }],
      description: 'Documento que aparece en la portada del catálogo. Dejar vacío para mostrar la portada estática.',
    }),
    defineField({
      name: 'catalogoDestacadoTitulo',
      title: 'Título del destacado',
      type: 'string',
      description: 'Título que se muestra en la portada del catálogo. Si queda vacío, usa el título del documento.',
    }),
    defineField({
      name: 'catalogoDestacadoBajada',
      title: 'Bajada',
      type: 'text',
      rows: 3,
      description: 'Descripción corta debajo del título. Si queda vacía, usa la descripción del documento.',
    }),
    defineField({
      name: 'catalogoDestacadoRefAutor',
      title: 'Referencia — Autor',
      type: 'string',
      description: 'Autor de la obra fuente (ej: "Gori, Gastón").',
    }),
    defineField({
      name: 'catalogoDestacadoRefObra',
      title: 'Referencia — Obra',
      type: 'string',
      description: 'Título de la obra fuente (ej: "La Forestal: la tragedia del quebracho colorado").',
    }),
    defineField({
      name: 'catalogoDestacadoRefAnio',
      title: 'Referencia — Año',
      type: 'string',
      description: 'Año de publicación (ej: "1965", "c. 1964").',
    }),
    defineField({
      name: 'catalogoDestacadoRefPaginas',
      title: 'Referencia — Página/s',
      type: 'string',
      description: 'Página o rango de páginas (ej: "p. 45", "pp. 45-52").',
    }),
  ],
  preview: {
    select: {
      documentoTitulo: 'destacadoDocumento.titulo',
      catTitulo: 'catalogoDestacadoTitulo',
      catDocTitulo: 'catalogoDestacadoDocumento.titulo',
    },
    prepare({ documentoTitulo, catTitulo, catDocTitulo }: {
      documentoTitulo?: string; catTitulo?: string; catDocTitulo?: string
    }) {
      const homeTitle = documentoTitulo || 'Sin destacado'
      const catTitle = catTitulo || catDocTitulo
      return {
        title: homeTitle,
        subtitle: catTitle ? `Home: ${homeTitle} · Catálogo: ${catTitle}` : `Home: ${homeTitle}`,
      }
    },
  },
})
