interface RawDataPanelProps {
  fuenteArchivo?: string
  referenciaArchivo?: string
  datosOriginales?: Array<{
    campo?: string
    campoOriginal?: string
    valor?: string
  }>
}

export function RawDataPanel({ fuenteArchivo, referenciaArchivo, datosOriginales }: RawDataPanelProps) {
  if (!fuenteArchivo && !referenciaArchivo && (!datosOriginales || datosOriginales.length === 0)) {
    return null
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#6c757d', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        🔒 Archivo de origen
      </div>
      <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', padding: '1.4rem' }}>
        {fuenteArchivo && (
          <div style={{ marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#6c757d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fuente: </span>
            <span style={{ fontSize: '0.88rem', color: '#495057' }}>{fuenteArchivo}</span>
          </div>
        )}
        {referenciaArchivo && (
          <div style={{ marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#6c757d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Referencia: </span>
            <span style={{ fontSize: '0.88rem', color: '#495057' }}>{referenciaArchivo}</span>
          </div>
        )}
        {datosOriginales && datosOriginales.length > 0 && (
          <div className="data-table-wrap" style={{ marginTop: '0.8rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campo normalizado</th>
                  <th>Campo original</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {datosOriginales.map((dato: any, i: number) => (
                  <tr key={i}>
                    <td>{dato.campo || '—'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>{dato.campoOriginal || '—'}</td>
                    <td>{dato.valor || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
