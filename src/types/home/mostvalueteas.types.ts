export interface TeaProduct {
  id:     number
  name:   string
  image:  string
  rating: number
  price:  number
  href:   string
}

export interface MostValuedTeasProps {
  products?: TeaProduct[]
}