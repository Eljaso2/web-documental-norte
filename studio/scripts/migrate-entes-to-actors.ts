import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '06aqvaal',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const TIPO_MAP: Record<string, string> = {
  'empresa-privada': 'empresa-privada',
  'empresa-estatal': 'empresa-estatal',
  'organismo-gubernamental': 'organismo-gubernamental',
  'sindicato': 'sindicato',
  'institucion-academica': 'institucion-academica',
  'organismo-internacional': 'organismo-internacional',
  'otro': 'organizacion',
}

const KNOWN_OVERLAPS: Record<string, string> = {
  'ente-la-forestal': 'actor-la-forestal',
  'ente-soiq': 'actor-soiq',
}

async function main() {
  console.log('=== MIGRACIÓN entesProductores → actores ===\n')

  const entes = await client.fetch('*[_type == "enteProductor"]{_id, titulo, nombrePopular, nombreLegal, tipoEnte, slug, descripcion}')
  console.log(`Entes encontrados: ${entes.length}`)

  const enteToActorMap: Record<string, string> = {}

  for (const ente of entes) {
    if (KNOWN_OVERLAPS[ente._id]) {
      enteToActorMap[ente._id] = KNOWN_OVERLAPS[ente._id]
      console.log(`⏭  SKIP (ya existe): ${ente.titulo} → ${KNOWN_OVERLAPS[ente._id]}`)

      // Update existing actor with more specific tipoActor
      const existingActor = await client.fetch('*[_id == $id][0]{tipoActor, nombreAlternativo, nombreLegal}', { id: KNOWN_OVERLAPS[ente._id] })
      const patches: Record<string, string> = {}
      if (ente.tipoEnte && TIPO_MAP[ente.tipoEnte] && existingActor.tipoActor === 'organizacion') {
        patches.tipoActor = TIPO_MAP[ente.tipoEnte]
      }
      if (ente.nombrePopular && !existingActor.nombreAlternativo) {
        patches.nombreAlternativo = ente.nombrePopular
      }
      if (ente.nombreLegal && !existingActor.nombreLegal) {
        patches.nombreLegal = ente.nombreLegal
      }
      if (Object.keys(patches).length > 0) {
        console.log(`   Patching: ${JSON.stringify(patches)}`)
        await client.patch(KNOWN_OVERLAPS[ente._id]).set(patches).commit()
      }
      continue
    }

    const slugBase = (ente as any).slug?.current || ente.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const actorDoc = {
      _id: `actor-${slugBase}`,
      _type: 'actor',
      nombre: ente.titulo,
      slug: { _type: 'slug', current: slugBase },
      tipoActor: TIPO_MAP[(ente as any).tipoEnte] || 'organizacion',
      descripcion: (ente as any).descripcion || undefined,
      nombreAlternativo: (ente as any).nombrePopular || undefined,
      nombreLegal: (ente as any).nombreLegal || undefined,
    }

    try {
      const created = await client.createIfNotExists(actorDoc)
      enteToActorMap[ente._id] = created._id
      console.log(`✅ CREADO: ${ente.titulo} → ${created._id} (${actorDoc.tipoActor})`)
    } catch (err: any) {
      console.error(`❌ ERROR creando ${ente.titulo}:`, err.message)
    }
  }

  // Update documentos
  const docs = await client.fetch('*[_type == "documento" && defined(entesProductores) && count(entesProductores) > 0]{_id, titulo, "entesProductores": entesProductores[]->{_id}}')
  console.log(`\nDocumentos con entesProductores: ${docs.length}`)

  for (const doc of docs) {
    const newEntesProductores = (doc as any).entesProductores
      .filter((ep: any) => enteToActorMap[ep._id])
      .map((ep: any, i: number) => ({
        _key: `ep-${Date.now()}-${i}`,
        _type: 'actorConRol',
        actor: { _type: 'reference', _ref: enteToActorMap[ep._id] },
        rol: 'autor-productor',
      }))

    if (newEntesProductores.length > 0) {
      console.log(`\n📝 Actualizando: ${(doc as any).titulo}`)
      console.log(`   ${(doc as any).entesProductores.length} refs viejas → ${newEntesProductores.length} actorConRol nuevas`)
      await client.patch(doc._id).set({ entesProductores: newEntesProductores }).commit()
      console.log('   ✅ Guardado')
    }
  }

  console.log('\n=== MIGRACIÓN COMPLETA ===')
  console.log('Los documentos enteProductor aún existen en Sanity. Podés eliminarlos desde el Studio cuando quieras.')
}

main().catch((err) => { console.error('FATAL:', err); process.exit(1) })
