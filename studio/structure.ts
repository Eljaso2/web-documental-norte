import { structureTool } from 'sanity/structure'

export const structure = structureTool({
  structure: (S) =>
    S.list()
      .id('archivo-root')
      .title('Archivo')
      .items([
        // --- Sitio (singleton) ---
        S.listItem()
          .id('sitio')
          .title('Sitio')
          .icon(() => '⚙️')
          .child(
            S.document()
              .schemaType('siteSettings')
              .documentId('site-settings')
              .title('Configuración del sitio')
          ),

        S.divider(),

        // --- Core documents ---
        S.listItem()
          .id('doc-documento')
          .title('Documentos')
          .child(
            S.documentTypeList('documento')
              .title('Documentos')
          ),
        S.listItem()
          .id('doc-narrativa')
          .title('Narrativas')
          .child(
            S.documentTypeList('narrativa')
              .title('Narrativas')
          ),
        S.listItem()
          .id('doc-actor')
          .title('Actores')
          .child(
            S.documentTypeList('actor')
              .title('Actores')
          ),

        S.divider(),

        // --- Taxonomías ---
        S.listItem()
          .id('taxonomias')
          .title('Taxonomías')
          .child(
            S.list()
              .id('taxonomias-list')
              .title('Taxonomías')
              .items([
                // --- Catálogos (prefijadas: solo selección al cargar) ---
                S.listItem()
                  .id('tax-catalogos')
                  .title('Catálogos')
                  .child(
                    S.list()
                      .id('catalogos-list')
                      .title('Catálogos')
                      .items([
                        S.listItem()
                          .id('tax-region')
                          .title('Regiones')
                          .child(
                            S.documentTypeList('region')
                              .id('region-list')
                              .title('Regiones')
                              .defaultOrdering([{ field: 'orden', direction: 'asc' }])
                          ),
                        S.listItem()
                          .id('tax-localidad')
                          .title('Localidades')
                          .child(
                            S.documentTypeList('localidad')
                              .id('localidad-list')
                              .title('Localidades')
                              .defaultOrdering([{ field: 'orden', direction: 'asc' }])
                          ),
                        S.listItem()
                          .id('tax-periodo')
                          .title('Tiempo')
                          .child(
                            S.list()
                              .id('tiempo-list')
                              .title('Tiempo')
                              .items([
                                S.listItem()
                                  .id('tiempo-periodos')
                                  .title('Períodos')
                                  .child(
                                    S.documentTypeList('periodo')
                                      .id('periodos-list')
                                      .title('Períodos')
                                      .filter('_type == "periodo" && !defined(periodoPadre)')
                                      .defaultOrdering([{ field: 'anioInicio', direction: 'asc' }])
                                  ),
                                S.listItem()
                                  .id('tiempo-subperiodos')
                                  .title('Sub-períodos')
                                  .child(
                                    S.documentTypeList('periodo')
                                      .id('subperiodos-list')
                                      .title('Sub-períodos')
                                      .filter('_type == "periodo" && defined(periodoPadre)')
                                      .defaultOrdering([{ field: 'anioInicio', direction: 'asc' }])
                                  ),
                              ])
                          ),
                        S.listItem()
                          .id('tax-institucion-custodia')
                          .title('Instituciones de custodia')
                          .child(
                            S.documentTypeList('institucionCustodia')
                              .id('institucion-custodia-list')
                              .title('Instituciones de custodia')
                          ),
                        S.listItem()
                          .id('tax-formato-salida')
                          .title('Formatos de salida')
                          .child(
                            S.documentTypeList('formatoSalida')
                              .id('formato-salida-list')
                              .title('Formatos de salida')
                          ),
                      ])
                  ),

                // --- Etiquetas (creables al cargar documento) ---
                S.listItem()
                  .id('tax-etiquetas')
                  .title('Etiquetas')
                  .child(
                    S.list()
                      .id('etiquetas-list')
                      .title('Etiquetas')
                      .items([
                        S.listItem()
                          .id('tax-tipo-documento')
                          .title('Tipos de documento')
                          .child(
                            S.documentTypeList('tipoDocumento')
                              .id('tipo-documento-list')
                              .title('Tipos de documento')
                              .defaultOrdering([{ field: 'orden', direction: 'asc' }])
                          ),
                        S.listItem()
                          .id('tax-tema')
                          .title('Temas')
                          .child(
                            S.documentTypeList('tema')
                              .id('tema-list')
                              .title('Temas')
                              .defaultOrdering([{ field: 'orden', direction: 'asc' }])
                          ),
                        // Entes productores → ver Actores (mismo listado)
                        S.listItem()
                          .id('tax-entes-productores')
                          .title('Entes productores')
                          .child(
                            S.documentTypeList('actor')
                              .id('entes-productores-list')
                              .title('Entes productores → Ver Actores')
                              .filter('_type == "actor" && tipoActor in ["organizacion", "empresa-privada", "empresa-estatal", "organismo-gubernamental", "sindicato", "institucion-academica", "organismo-internacional"]')
                              .defaultOrdering([{ field: 'nombre', direction: 'asc' }])
                          ),
                      ])
                  ),
              ])
          ),
      ]),
})
