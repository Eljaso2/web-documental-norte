'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { icons } from './Icons'

const menuSections = [
  {
    href: '/catalogo',
    title: 'Archivo',
    icon: 'archivo',
    desc: 'Explorá los documentos por región, período, tipo o tema. Filtros cruzados para investigadores.',
  },
  {
    href: '/instituciones',
    title: 'Instituciones',
    icon: 'instituciones',
    desc: 'Instituciones que alojan material de archivo del norte santafesino.',
  },
  {
    href: '/pueblos',
    title: 'Pueblos',
    icon: 'pueblos',
    desc: 'Comunidades y pueblos del norte de Santa Fe: su historia, su territorio, su memoria.',
  },
  {
    href: '/actores',
    title: 'Actores',
    icon: 'actores',
    desc: 'Empresas, sindicatos, fuerzas represivas, investigadores. Quiénes son y qué roles cumplieron.',
  },
  {
    href: '/mapa',
    title: 'Mapa',
    icon: 'mapa',
    desc: 'Explorá el territorio del norte santafesino. Localidades, regiones, sitios de memoria.',
  },
  {
    href: '/historia-oral',
    title: 'Historia Oral',
    icon: 'historia-oral',
    desc: 'Testimonios y tradiciones orales que transmiten la memoria viva de las comunidades.',
  },
  {
    href: '/tiempo',
    title: 'Tiempo',
    icon: 'tiempo',
    desc: 'Cronología y líneas de tiempo de los procesos históricos del norte santafesino.',
  },
  {
    href: '/objetos',
    title: 'Objetos',
    icon: 'objetos',
    desc: 'Objetos materiales que cuentan la historia: herramientas, documentos, fotografías.',
  },
]

export function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Determine section title for navbar
  const sectionTitle = pathname === '/catalogo' ? 'Archivo'
    : pathname === '/instituciones' ? 'Instituciones'
    : pathname === '/pueblos' ? 'Pueblos'
    : pathname === '/actores' ? 'Actores'
    : pathname === '/mapa' ? 'Mapa'
    : pathname === '/historia-oral' ? 'Historia Oral'
    : pathname === '/tiempo' ? 'Tiempo'
    : pathname === '/objetos' ? 'Objetos'
    : pathname.startsWith('/documento/') ? 'Archivo'
    : ''

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="navbar-brand">
            <img src="/header_logo.svg" alt="HnSF" />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {sectionTitle && (
              <div className="navbar-section-title">{sectionTitle}</div>
            )}
            <button
              className="navbar-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span style={{ display: 'block' }}>Menú</span>
              <span className="menu-icon" style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '14px' }}>
                {menuOpen ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                ) : (
                  <>
                    <span style={{ display: 'block', height: '2px', background: 'currentColor', width: '100%' }} />
                    <span style={{ display: 'block', height: '2px', background: 'currentColor', width: '100%' }} />
                    <span style={{ display: 'block', height: '2px', background: 'currentColor', width: '100%' }} />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu overlay */}
      <div className={`menu-overlay ${menuOpen ? '' : 'menu-hidden'}`}>
        <div className="menu-items">
          {menuSections.map((section) => (
            <Link key={section.href} href={section.href} className="menu-item">
              <div className="no-img">{icons[section.icon]}</div>
              <div>
                <h4>{section.title}</h4>
                <p>{section.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="#" className="menu-about-link">
          <h4>Sobre el proyecto</h4>
        </Link>
      </div>
    </>
  )
}
