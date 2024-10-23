import { Header } from '@/components/Header'
import { ProductList } from '@/components/ProductList'

export default async function Menu() {
  return (
    <>
      <Header />

      <main className="mx-auto mt-0 max-w-7xl p-6 lg:-mt-20 lg:px-8">
        <ProductList />
      </main>
    </>
  )
}
