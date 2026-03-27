import { TeaProduct } from "@/types/home/mostvalueteas.types"

export const MOST_VALUED_TEAS: TeaProduct[] = [
  {
    id:     1,
    name:   'Golden Needles',
    image:  '/teas/tea1.svg',
    rating: 5.0,
    price:  50,
    href:   '/shop/golden-needles',
  },
  {
    id:     2,
    name:   'Golden Tips Normal',
    image:  '/teas/tea2.svg',
    rating: 5.0,
    price:  50,
    href:   '/shop/golden-tips-normal',
  },
  {
    id:     3,
    name:   'White Needle Tip',
    image:  '/teas/tea3.svg',
    rating: 5.0,
    price:  50,
    href:   '/shop/white-needle-tip',
  },
  {
    id:     4,
    name:   'White Needle Normal',
    image:  '/teas/tea4.svg',
    rating: 5.0,
    price:  50,
    href:   '/shop/white-needle-normal',
  },
]

export const MVT_SECTION_HEADING = 'Our Most Valued Teas'
export const MVT_VIEW_ALL_LABEL  = 'View All Teas'
export const MVT_VIEW_ALL_HREF   = '/product'