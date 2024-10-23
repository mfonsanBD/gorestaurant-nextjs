import { getProducts } from '@/actions/product'
import { AdminProductList } from '@/components/AdminProductList'
import { Header } from '@/components/Header'
import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: `Área Administrativa - Produtos - ${process.env.APPNAME}`,
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }
  const products = await getProducts()

  return (
    <>
      <Header />

      <main className="mx-auto mt-0 max-w-7xl p-6 lg:-mt-20 lg:px-8">
        <AdminProductList products={products || []} />
      </main>
    </>
  )
}
