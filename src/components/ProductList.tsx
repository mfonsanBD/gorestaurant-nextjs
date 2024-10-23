import { getProducts } from '@/actions/product'
import { ProductHomeItem } from './ProductHomeItem'

export const ProductList = async () => {
  const products = (await getProducts()) || []
  return (
    <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((item) => <ProductHomeItem key={item.id} {...item} />)
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
