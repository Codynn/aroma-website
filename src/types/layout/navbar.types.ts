export interface NavLink {
  label: string
  href:  string
}

export interface NavbarProps {
  cartCount?: number
}

export interface MobileMenuProps {
  isOpen:    boolean
  onClose:   () => void
  links:     NavLink[]
  cartCount: number
  scrolled:  boolean
}