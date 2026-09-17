import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'datoOriginal',
  title: 'Dato original',
  type: 'object',
  fields: [
    defineField({
      name: 'campo',
      title: 'Campo (normalizado)',
      type: 'string',
      description: 'Nombre normalizado del campo en la capa curada (ej: "fecha", "titulo", "autor")',
    }),
    defineField({
      name: 'campoOriginal',
      title: 'Campo original',
      type: 'string',
      description: 'Nombre tal cual aparece en el archivo de origen (ej: "FECHA DOC", "Nro. Exp.")',
    }),
    defineField({
      name: 'valor',
      title: 'Valor',
      type: 'text',
      description: 'Valor textual tal cual aparece en la fuente, sin normalizar',
      rows: 2,
    }),
  ],
  preview: {
    select: { campo: 'campo', valor: 'valor' },
    prepare({ campo, valor }: { campo?: string; valor?: string }) {
      return {
        title: campo || 'Sin campo',
        subtitle: valor ? valor.substring(0, 60) + (valor.length > 60 ? '…' : '') : 'Sin valor',
      }
    },
  },
})
