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
      description: 'Documento que aparece en la portada del sitio. Solo uno a la vez.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destacadoVolanta',
      title: 'Volanta',
      type: 'string',
      description: 'Texto chico arriba del título (ej: "Archivo destacado", "Fuentes primarias"). Si queda vacío, usa "Archivo destacado".',
      initialValue: 'Archivo destacado',
    }),
    defineField({
      name: 'destacadoTitulo',
      title: 'Título',
      type: 'string',
      description: 'Título del destacado. Si queda vacío, usa el título del documento.',
    }),
    defineField({
      name: 'destacadoBajada',
      title: 'Bajada',
      type: 'text',
      rows: 3,
      description: 'Descripción corta debajo del título. Si queda vacía, usa la descripción del documento.',
    }),
    defineField({
      name: 'destacadoImagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen del destacado en la portada. Si queda vacía, usa la primera imagen del documento.',
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
      volanta: 'destacadoVolanta',
      titulo: 'destacadoTitulo',
      documentoTitulo: 'destacadoDocumento.titulo',
      catTitulo: 'catalogoDestacadoTitulo',
      catDocTitulo: 'catalogoDestacadoDocumento.titulo',
    },
    prepare({ volanta, titulo, documentoTitulo, catTitulo, catDocTitulo }: {
      volanta?: string; titulo?: string; documentoTitulo?: string; catTitulo?: string; catDocTitulo?: string
    }) {
      const homeTitle = titulo || documentoTitulo || 'Sin destacado'
      const catTitle = catTitulo || catDocTitulo
      return {
        title: homeTitle,
        subtitle: catTitle ? `Home: ${homeTitle} · Catálogo: ${catTitle}` : `Home: ${homeTitle}`,
      }
    },
  },
})
