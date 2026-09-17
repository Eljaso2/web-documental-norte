import { defineConfig } from 'sanity'
import { schemaTypes } from './schemas'
import { structure } from './structure'

export default defineConfig({
  name: 'historia-norte-santafe',
  title: 'Historia del Norte de Santa Fe',
  projectId: '06aqvaal',
  dataset: 'production',
  plugins: [structure],
  schema: {
    types: schemaTypes,
  },
})
