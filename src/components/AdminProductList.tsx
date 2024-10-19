'use client'

import { SquarePlus } from 'lucide-react'
import { ProductItem } from './ProductItem'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { useState } from 'react'

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
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Adicionar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <button
        onClick={() => setModalIsOpen(true)}
        className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-white text-zinc-400"
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
