import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'actor',
  title: 'Actor',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nombre', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'tipoActor',
      title: 'Tipo de actor',
      type: 'string',
      options: {
        list: [
          { title: 'Persona', value: 'persona' },
          { title: 'Organización / Empresa', value: 'organizacion' },
          { title: 'Empresa privada', value: 'empresa-privada' },
          { title: 'Empresa estatal', value: 'empresa-estatal' },
          { title: 'Organismo gubernamental', value: 'organismo-gubernamental' },
          { title: 'Sindicato', value: 'sindicato' },
          { title: 'Institución estatal', value: 'institucion-estatal' },
          { title: 'Fuerza de seguridad', value: 'fuerza-seguridad' },
          { title: 'Institución académica', value: 'institucion-academica' },
          { title: 'Organismo internacional', value: 'organismo-internacional' },
          { title: 'Colectivo / Comunidad', value: 'colectivo' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Breve descripción del actor y su relevancia en la historia del norte santafesino',
    }),
    defineField({
      name: 'nombreAlternativo',
      title: 'Nombre alternativo / paralelo',
      type: 'string',
      description: 'Nombre popular, alias, o denominación institucional alternativa',
    }),
    defineField({
      name: 'nombreLegal',
      title: 'Nombre legal / oficial',
      type: 'string',
      description: 'Razón social completa (ej: "The Forestal Land, Timber and Railways Company Limited")',
    }),
    defineField({
      name: 'fechaNacimiento',
      title: 'Fecha de nacimiento / fundación',
      type: 'fechaRango',
    }),
    defineField({
      name: 'fechaFallecimiento',
      title: 'Fecha de fallecimiento / disolución',
      type: 'fechaRango',
    }),
    defineField({
      name: 'localidad',
      title: 'Localidad asociada',
      type: 'reference',
      to: [{ type: 'localidad' }],
    }),
  ],
  preview: {
    select: { nombre: 'nombre', tipo: 'tipoActor', alt: 'nombreAlternativo' },
    prepare({ nombre, tipo, alt }: { nombre?: string; tipo?: string; alt?: string }) {
      return {
        title: nombre,
        subtitle: [tipo, alt].filter(Boolean).join(' · '),
      }
    },
  },
})
