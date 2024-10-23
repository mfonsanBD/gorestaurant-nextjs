'use client'

import { getProducts } from '@/actions/product'
import { ProductHomeItem } from './ProductHomeItem'
import { useEffect, useState } from 'react'
import { Skeleton } from './Skeleton'

export const ProductList = () => {
  const [productsList, setProductsList] = useState<ProductsProps[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getAllProducts() {
      setLoading(true)
      const pdts = await getProducts()
      setProductsList(pdts || [])
      setLoading(false)
    }

    getAllProducts()
  }, [])
  return (
    <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      {loading ? (
        [1, 2, 3].map((item) => <Skeleton key={item} />)
      ) : productsList.length > 0 ? (
        productsList.map((item) => <ProductHomeItem key={item.id} {...item} />)
      ) : (
        <div className="col-span-1 flex h-64 items-center justify-center rounded-lg bg-white lg:col-span-3">
          <p className="text-center text-zinc-500">
            Nenhum produto registrado no nosso site ainda
          </p>
        </div>
      )}
    </section>
  )
}
