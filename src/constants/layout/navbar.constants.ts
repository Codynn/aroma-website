import { NavLink } from "@/types/layout/navbar.types"

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Product',        href: '/product'        },
  { label: 'Contact',     href: '/contact'     },
  { label: 'About',       href: '/about'       },
  
]

export const NAVBAR_LOGO = {
  src:     '/home/logo.svg',      // white logo — transparent navbar
  srcDark: '/Images/blacklogo.svg', // dark logo  — white navbar (scrolled)
  alt:     'Aroma Speciality Tea',
  width:   99,
  height:  60,
} as const

// Trigger white bg when user has scrolled 80% of viewport height
export const SCROLL_THRESHOLD_VH = 0.8