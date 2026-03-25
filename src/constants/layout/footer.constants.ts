import type { FooterContent } from '@/types/layout/footer.types'

export const FOOTER_CONTENT: FooterContent = {
  logo:'/home/logo.svg',
  logoAlt:'Aroma Speciality Tea',
  description:'Stay connected with us on social media for exclusive content, behind-the-scenes, tea tips, and special offers!',
  bgImage:'/home/footer.png',

  discoverTitle: 'Discover',
  discoverLinks: [
    { label: 'Home',    href: '/'           },
    { label: 'Shop',    href: '/product'       },
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
    { id: 2, icon: 'mail',    text: 'aromateanepal@gmail.com',   href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aromateanepal@gmail.com&su=Standard%20Package%20Setup&body=I%20want%20to%20setup%20standard%20package%20for%20my%20business'   },
    { id: 3, icon: 'whatsapp',    text: '+977-9761669953',      href: 'https://api.whatsapp.com/send/?phone=9761669953&text=I%20want%20to%20setup%20standard%20package%20for%20my%20business'         },
  ],

  copyright: '© 2026 Aroma Speciality. All Right Reserved.',
}