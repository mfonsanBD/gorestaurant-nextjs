import { FormatPrice } from '@/utils/priceFormatter'
import Image from 'next/image'

export const ProductList = ({ products }: ProductItemsProps) => {
  return (
    <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      {products.map((item) => (
        <div key={item.id} className="relative rounded-lg bg-white">
          {!item.isActive && (
            <div className="absolute z-50 flex h-full w-full items-center justify-center rounded-lg bg-red-600/90">
              <p className="-rotate-12 scale-125 text-3xl font-bold uppercase text-yellow-500 lg:scale-150">
                Indisponível
              </p>
            </div>
          )}

          <div className="relative h-56 w-full">
            <Image
              src={item.photo}
              alt={item.name}
              fill
              className="w-full rounded-t-lg object-cover"
            />
          </div>

          <div className="p-4">
            <h3 className="font-poppins text-lg font-semibold text-zinc-600">
              {item.name}
            </h3>

            <p className="pt-1 text-sm font-normal text-zinc-400">
              {item.description}
            </p>

            <p className="pt-2 text-lg font-semibold text-emerald-500">
              {FormatPrice(item.price)}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
