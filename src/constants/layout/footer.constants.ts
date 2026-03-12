import type { FooterContent } from '@/types/layout/footer.types'

export const FOOTER_CONTENT: FooterContent = {
  logo:'/home/logo.svg',
  logoAlt:'Aroma Speciality Tea',
  description:'Stay connected with us on social media for exclusive content, behind-the-scenes, tea tips, and special offers!',
  bgImage:'/home/footer.png',

  discoverTitle: 'Discover',
  discoverLinks: [
    { label: 'Home',    href: '/'           },
    { label: 'Shop',    href: '/shop'       },
    { label: 'About',   href: '/about'      },
    { label: 'Contact', href: '/contact'    },
  ],

  termsTitle: 'Terms & Conditions',
  termsLinks: [
    { label: 'Refund and Return Policy', href: '/refund-policy'  },
    { label: 'Terms and Services',       href: '/terms'          },
  ],

  contactInfo: [
    { id: 1, icon: 'location', text: 'Fikkal, Ilam, Nepal'  },
    { id: 2, icon: 'mail',    text: 'example@gmail.com',   href: 'mailto:example@gmail.com'   },
    { id: 3, icon: 'whatsapp',    text: '+977-9761669953',      href: 'tel:+9779761669953'         },
  ],

  copyright: '© 2026 Aroma Speciality. All Right Reserved.',
}