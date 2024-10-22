declare interface ProductsProps {
  id?: number
  name: string
  description: string
  photo?: string
  price: number
  isActive?: boolean
}

declare interface ProductItemsProps {
  products: ProductsProps[]
}
