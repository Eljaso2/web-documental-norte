import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '06aqvaal',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || '',
});

const types = ['region', 'tipoDocumento', 'periodo', 'localidad', 'tema'];

async function migrate() {
  let totalPatches = 0;
  
  for (const t of types) {
    // Fetch all docs with nombreOriginal, filter in JS since GROQ can't type-check easily
    const docs = await client.fetch(
      `*[_type == $type && defined(nombreOriginal)]{ _id, titulo, nombreOriginal }`,
      { type: t }
    );

    // Filter to only string (non-array) values
    const stringDocs = docs.filter(d => typeof d.nombreOriginal === 'string');

    console.log(`\n=== ${t} ===`);
    console.log(`Found ${stringDocs.length} documents with old string nombreOriginal (of ${docs.length} total)`);
    
    for (const doc of stringDocs) {
      const oldVal = doc.nombreOriginal;
      if (typeof oldVal !== 'string') {
        console.log(`  Skipping ${doc._id}: unexpected type ${typeof oldVal}`);
        continue;
      }
      
      // Split by comma, trim whitespace, remove empties
      const newVal = oldVal.split(',').map(s => s.trim()).filter(Boolean);
      console.log(`  ${doc.titulo || doc._id}: "${oldVal}" → ${JSON.stringify(newVal)}`);
      
      // Only patch if token is available
      if (process.env.SANITY_API_TOKEN) {
        await client.patch(doc._id).set({ nombreOriginal: newVal }).commit();
        console.log(`    ✅ Patched`);
        totalPatches++;
      } else {
        console.log(`    ⏭️  DRY RUN (no token)`);
      }
    }
  }
  
  console.log(`\n${process.env.SANITY_API_TOKEN ? `Patched: ${totalPatches}` : 'DRY RUN - set SANITY_API_TOKEN to apply changes'}`);
}

migrate().catch(console.error);
