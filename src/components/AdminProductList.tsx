'use client'

import { SquarePlus } from 'lucide-react'
import { ProductItem } from './ProductItem'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { useState } from 'react'
import { AddProductForm } from './AddProductForm'
import clsx from 'clsx'

export const AdminProductList = ({ products }: ProductItemsProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      <AlertDialog
        open={modalIsOpen}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return
          setModalIsOpen(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Adicionar Produto</AlertDialogTitle>
            <AlertDialogDescription>
              Preencha o formulário abaixo para cadastrar seu produto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AddProductForm onModalOpen={setModalIsOpen} />
        </AlertDialogContent>
      </AlertDialog>

      <button
        onClick={() => setModalIsOpen(true)}
        className={clsx(
          'flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white text-zinc-400',
          {
            'h-80 lg:h-full': products.length > 0,
            'h-96': products.length == 0,
          },
        )}
      >
        <SquarePlus size={32} />
        <p>Adicionar Prato</p>
      </button>

      {products.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </section>
  )
}
