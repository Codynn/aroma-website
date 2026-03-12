import { NavLink } from "@/types/layout/navbar.types"

export const NAV_LINKS: NavLink[] = [
  { label: 'Shop',        href: '/shop'        },
  { label: 'Contact',     href: '/contact'     },
  { label: 'About',       href: '/about'       },
  { label: 'Tea Stories', href: '/tea-stories' },
]

export const NAVBAR_LOGO = {
  src:     '/home/logo.svg',      // white logo — transparent navbar
  srcDark: '/home/blacklogo.svg', // dark logo  — white navbar (scrolled)
  alt:     'Aroma Speciality Tea',
  width:   56,
  height:  56,
} as const

// Trigger white bg when user has scrolled 80% of viewport height
export const SCROLL_THRESHOLD_VH = 0.8