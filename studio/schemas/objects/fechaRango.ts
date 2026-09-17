import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fechaRango',
  title: 'Fecha',
  type: 'object',
  fields: [
    defineField({
      name: 'fechaInicio',
      title: 'Fecha inicio',
      type: 'date',
      description: 'Si es una fecha única, usar solo este campo',
    }),
    defineField({
      name: 'fechaFin',
      title: 'Fecha fin',
      type: 'date',
      description: 'Dejar vacío si es fecha única o el evento no tiene fin definido',
    }),
    defineField({
      name: 'circa',
      title: 'Aproximada (circa)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'fechaDisplay',
      title: 'Fecha para mostrar',
      type: 'string',
      description: 'Texto libre para display (ej: "c. 1903", "Fines de 1920", "Ene-Feb 1921")',
    }),
  ],
  preview: {
    select: { display: 'fechaDisplay', inicio: 'fechaInicio', circa: 'circa' },
    prepare({ display, inicio, circa }: { display?: string; inicio?: string; circa?: boolean }) {
      return {
        title: display || inicio || 'Sin fecha',
        subtitle: circa ? 'circa' : undefined,
      }
    },
  },
})
