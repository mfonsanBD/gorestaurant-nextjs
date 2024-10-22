'use client'

import { FormatPrice } from '@/utils/priceFormatter'
import { Info, X } from 'lucide-react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

export const ProductHomeItem = ({
  description,
  isActive,
  name,
  photo,
  price,
}: ProductsProps) => {
  return (
    <div className="relative rounded-lg bg-white">
      {!isActive && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center rounded-lg bg-red-600/90">
          <p className="-rotate-12 scale-125 text-3xl font-bold uppercase text-yellow-500 lg:scale-150">
            Indisponível
          </p>
        </div>
      )}

      <div className="relative h-56 w-full">
        <Image
          src={`/upload/${photo}`}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="w-full rounded-t-lg object-cover"
        />
      </div>

      <div className="relative flex flex-col items-start justify-between p-4">
        <span>
          <h3 className="font-poppins text-lg font-semibold text-zinc-600">
            {name}
          </h3>

          <p className="line-clamp-2 pt-1 text-sm font-normal text-zinc-400">
            {description}
          </p>
          {description.length > 95 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <small className="inline-flex cursor-pointer text-yellow-500">
                  <Info size={18} />
                </small>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex items-end justify-between gap-2">
                    <AlertDialogTitle>{name}</AlertDialogTitle>
                    <AlertDialogCancel>
                      <X />
                    </AlertDialogCancel>
                  </div>
                  <AlertDialogDescription className="text-left">
                    {description}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </span>

        <p className="pt-2 text-lg font-semibold text-emerald-500">
          {FormatPrice(price)}
        </p>
      </div>
    </div>
  )
}
