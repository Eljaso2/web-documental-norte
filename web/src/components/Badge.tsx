interface BadgeProps {
  titulo: string
  color?: string
  slug?: string
}

export function Badge({ titulo, color }: BadgeProps) {
  return (
    <span
      className="badge-tag custom"
      style={{ background: color || '#343a40' }}
    >
      {titulo}
    </span>
  )
}
