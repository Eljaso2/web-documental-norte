import documento from './documents/documento'
import narrativa from './documents/narrativa'
import actor from './documents/actor'
import siteSettings from './documents/siteSettings'

import region from './taxonomies/region'
import localidad from './taxonomies/localidad'
import periodo from './taxonomies/periodo'
import tipoDocumento from './taxonomies/tipoDocumento'
import tema from './taxonomies/tema'
import formatoSalida from './taxonomies/formatoSalida'
import institucionCustodia from './taxonomies/institucionCustodia'

import fechaRango from './objects/fechaRango'
import datoOriginal from './objects/datoOriginal'
import actorConRol from './objects/actorConRol'

export const schemaTypes = [
  // Objects first
  fechaRango,
  datoOriginal,
  actorConRol,
  // Taxonomies
  region,
  localidad,
  periodo,
  tipoDocumento,
  tema,
  formatoSalida,
  institucionCustodia,
  // Core documents (last = top of Studio list)
  siteSettings,
  actor,
  documento,
  narrativa,
]
