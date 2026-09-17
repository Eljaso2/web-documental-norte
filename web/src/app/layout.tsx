import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { GrainOverlay } from '@/components/GrainOverlay'

export const metadata: Metadata = {
  title: 'Historia del Norte de Santa Fe',
  description: 'Archivo documental y divulgación histórica del Seminario Permanente de Historia del Norte de Santa Fe',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <GrainOverlay />
        <Nav />
        <main className="page-content">{children}</main>
      </body>
    </html>
  )
}
