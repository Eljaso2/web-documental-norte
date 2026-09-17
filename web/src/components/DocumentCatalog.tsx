'use client'

import { useState, useMemo } from 'react'
import { DocumentCard } from './DocumentCard'

interface DocumentCatalogProps {
  documentos: any[]
  regiones: any[]
  localidades: any[]
  periodos: any[]
  tiposDocumento: any[]
  temas: any[]
}

export function DocumentCatalog({ documentos, regiones, localidades, periodos, tiposDocumento, temas }: DocumentCatalogProps) {
  const [search, setSearch] = useState('')
  const [filterTipo, setFilterTipo] = useState<string | null>(null)
  const [filterPeriodo, setFilterPeriodo] = useState<string | null>(null)
  const [filterRegion, setFilterRegion] = useState<string | null>(null)
  const [filterLocalidad, setFilterLocalidad] = useState<string | null>(null)
  const [filterTema, setFilterTema] = useState<string | null>(null)

  // When region filter changes, clear localidad if it doesn't belong to that region
  const handleRegionChange = (regionId: string | null) => {
    setFilterRegion(regionId)
    if (filterLocalidad && regionId) {
      const loc = localidades.find((l: any) => l._id === filterLocalidad)
      if (loc?.region?._id && loc.region._id !== regionId) {
        setFilterLocalidad(null)
      }
    }
  }

  // Filter localidades: if region is selected, only show localidades from that region
  const filteredLocalidades = useMemo(() => {
    if (!filterRegion) return localidades
    return localidades.filter((l: any) => l.region?._id === filterRegion)
  }, [localidades, filterRegion])

  const filtered = useMemo(() => {
    return documentos.filter((doc: any) => {
      if (search) {
        const q = search.toLowerCase()
        const match = doc.titulo?.toLowerCase().includes(q) ||
          doc.descripcion?.toLowerCase().includes(q) ||
          doc.codigoReferencia?.toLowerCase().includes(q)
        if (!match) return false
      }
      if (filterTipo && !doc.tiposDocumento?.some((t: any) => t._id === filterTipo)) return false
      if (filterPeriodo && !doc.periodos?.some((p: any) => p._id === filterPeriodo)) return false
      if (filterRegion && !doc.regiones?.some((r: any) => r._id === filterRegion)) return false
      if (filterLocalidad && !doc.localidades?.some((l: any) => l._id === filterLocalidad)) return false
      if (filterTema && !doc.temas?.some((t: any) => t._id === filterTema)) return false
      return true
    })
  }, [documentos, search, filterTipo, filterPeriodo, filterRegion, filterLocalidad, filterTema])

  const activeFilters = [filterTipo, filterPeriodo, filterRegion, filterLocalidad, filterTema].filter(Boolean).length

  const clearAll = () => {
    setFilterTipo(null)
    setFilterPeriodo(null)
    setFilterRegion(null)
    setFilterLocalidad(null)
    setFilterTema(null)
  }

  return (
    <div>
      {/* Search (Digital Benin style: clean input) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Buscar documentos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '0.5rem 0.75rem',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            background: '#fff',
            border: '1px solid #dee2e6',
            borderRadius: 0,
            color: '#212529',
            outline: 'none',
          }}
        />
      </div>

      {/* Filter bar (Digital Benin: badges + selects) */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        {/* Tipo badges */}
        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
          {tiposDocumento.map((tipo: any) => (
            <button
              key={tipo._id}
              onClick={() => setFilterTipo(filterTipo === tipo._id ? null : tipo._id)}
              className="badge-tag custom"
              style={{
                background: filterTipo === tipo._id ? (tipo.color || '#a08841') : '#343a40',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
                padding: '0.2rem 0.5rem',
                fontFamily: 'inherit',
              }}
            >
              {tipo.titulo}
            </button>
          ))}
        </div>

        <span style={{ color: '#dee2e6' }}>|</span>

        {/* Selects */}
        <select
          value={filterPeriodo || ''}
          onChange={(e) => setFilterPeriodo(e.target.value || null)}
          style={{
            background: '#fff',
            color: '#495057',
            border: '1px solid #dee2e6',
            borderRadius: 0,
            padding: '0.3rem 0.6rem',
            fontFamily: 'inherit',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          <option value="">Tiempo</option>
          {periodos.map((p: any) => (
            <optgroup key={p._id} label={`${p.titulo} (${p.anioInicio}${p.anioFin ? `-${p.anioFin}` : '+'})`}>
              <option value={p._id}>{p.titulo} ({p.anioInicio}{p.anioFin ? `-${p.anioFin}` : '+'})</option>
              {p.subPeriodos?.map((sp: any, si: number) => (
                <option key={si} value={p._id} disabled>
                    {sp.titulo}{sp.anioInicio ? ` (${sp.anioInicio}${sp.anioFin ? `-${sp.anioFin}` : '+'})` : ''}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <select
          value={filterRegion || ''}
          onChange={(e) => handleRegionChange(e.target.value || null)}
          style={{
            background: '#fff',
            color: '#495057',
            border: '1px solid #dee2e6',
            borderRadius: 0,
            padding: '0.3rem 0.6rem',
            fontFamily: 'inherit',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          <option value="">Región</option>
          {regiones.map((r: any) => (
            <option key={r._id} value={r._id}>{r.titulo}</option>
          ))}
        </select>

        <select
          value={filterLocalidad || ''}
          onChange={(e) => setFilterLocalidad(e.target.value || null)}
          style={{
            background: '#fff',
            color: '#495057',
            border: '1px solid #dee2e6',
            borderRadius: 0,
            padding: '0.3rem 0.6rem',
            fontFamily: 'inherit',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          <option value="">Localidad</option>
          {filteredLocalidades.map((l: any) => (
            <option key={l._id} value={l._id}>{l.titulo}</option>
          ))}
        </select>

        <select
          value={filterTema || ''}
          onChange={(e) => setFilterTema(e.target.value || null)}
          style={{
            background: '#fff',
            color: '#495057',
            border: '1px solid #dee2e6',
            borderRadius: 0,
            padding: '0.3rem 0.6rem',
            fontFamily: 'inherit',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          <option value="">Tema</option>
          {temas.map((t: any) => (
            <option key={t._id} value={t._id}>{t.titulo}</option>
          ))}
        </select>

        {/* Clear */}
        {activeFilters > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: 'none',
              border: '1px solid #a08841',
              color: '#a08841',
              borderRadius: 0,
              padding: '0.25rem 0.5rem',
              fontFamily: 'inherit',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Results count */}
      <div style={{ fontSize: '0.875rem', color: '#6c757d', marginBottom: '1rem' }}>
        {filtered.length} documento{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Card grid (Digital Benin: 1→2→3→4 cols) */}
      <div className="card-grid">
        {filtered.map((doc: any) => (
          <DocumentCard key={doc._id} documento={doc} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d', fontSize: '0.9rem' }}>
          No se encontraron documentos con los filtros seleccionados.
        </div>
      )}
    </div>
  )
}
