import { APPNAME } from '@/app/layout'
import { AdminProductList } from '@/components/AdminProductList'
import { Header } from '@/components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Área Administrativa - Produtos - ${APPNAME}`,
}

const products: ProductsProps[] = [
  {
    id: 1,
    name: 'Hamburguer 01',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 2,
    name: 'Hamburguer 02',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 3,
    name: 'Hamburguer 03',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 4,
    name: 'Hamburguer 04',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: false,
  },
  {
    id: 5,
    name: 'Hamburguer 05',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
  {
    id: 6,
    name: 'Hamburguer 06',
    description:
      'O melhor hamburguer da região. pão australiano, hamburguer de picanha 120g, bacon e cheddar',
    photo:
      'https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg',
    price: 80.9,
    isActive: true,
  },
]

export default function AdminPage() {
  return (
    <>
      <Header />

      <main className="mx-auto mt-0 max-w-7xl p-6 lg:-mt-20 lg:px-8">
        <AdminProductList products={products} />
      </main>
    </>
  )
}
