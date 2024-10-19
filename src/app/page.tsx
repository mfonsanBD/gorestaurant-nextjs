import { Header } from '@/components/Header'
import { ProductList } from '@/components/ProductList'

const products: ProductsProps[] = [
  {
    id: 1,
    name: 'Hamburguer',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 2,
    name: 'Hamburguer',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 3,
    name: 'Hamburguer',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 4,
    name: 'Hamburguer',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: false,
  },
  {
    id: 5,
    name: 'Hamburguer',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 6,
    name: 'Hamburguer',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
]

export default function Menu() {
  return (
    <>
      <Header />

      <main className="mx-auto mt-0 max-w-7xl p-6 lg:-mt-20 lg:px-8">
        <ProductList products={products} />
      </main>
    </>
  )
}
