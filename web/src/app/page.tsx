import { client } from '@/lib/sanity'
import { COUNTS, SITE_SETTINGS } from '@/lib/queries'
import { HomeClient } from '@/components/HomeClient'

export const revalidate = 60

export default async function Home() {
  let counts = { documentos: 0, narrativas: 0, actores: 0 }
  let hero = null
  try {
    ;[counts, hero] = await Promise.all([
      client.fetch(COUNTS),
      client.fetch(SITE_SETTINGS),
    ])
  } catch {}

  return <HomeClient counts={counts} hero={hero} />
}
