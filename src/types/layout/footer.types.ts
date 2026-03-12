export interface FooterLink {
  label: string
  href:  string
}

export interface FooterContact {
  id:    number
  icon:  string   // filename in /icons/ e.g. 'location', 'email', 'phone'
  text:  string
  href?: string
}

export interface FooterContent {
  logo:          string
  logoAlt:       string
  description:   string
  bgImage:       string
  discoverTitle: string
  discoverLinks: FooterLink[]
  termsTitle:    string
  termsLinks:    FooterLink[]
  contactInfo:   FooterContact[]
  copyright:     string
}