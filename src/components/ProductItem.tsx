'use client'

import Image from 'next/image'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { FormatPrice } from '@/utils/priceFormatter'
import { useState } from 'react'
import { PenLine, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
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

export const ProductItem = ({
  description,
  id,
  isActive,
  name,
  photo,
  price,
}: ProductsProps) => {
  const [productIsActive, setproductIsActive] = useState(isActive)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleProductIsActive = (value: boolean) => {
    setproductIsActive(value)
  }

  return (
    <div className="relative rounded-lg bg-white">
      <div className="relative h-56 w-full">
        <Image
          src={photo}
          alt={name}
          fill
          className="w-full rounded-t-lg object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-poppins text-lg font-semibold text-zinc-600">
          {name}
        </h3>

        <p className="pt-1 text-sm font-normal text-zinc-400">{description}</p>

        <p className="pt-2 text-lg font-semibold text-emerald-500">
          {FormatPrice(price)}
        </p>
      </div>

      <div className="flex w-full items-center justify-between gap-2 rounded-b-lg bg-zinc-100 p-4">
        <div className="flex flex-1 items-center gap-x-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setOpenEdit(true)}
                >
                  <PenLine size={16} className="text-zinc-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setOpenDelete(true)}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Excluir</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Switch
            checked={productIsActive}
            onCheckedChange={handleProductIsActive}
            id={`isActive${id}}`}
          />
          <Label htmlFor={`isActive${id}}`}>Disponível</Label>
        </div>
      </div>

      <AlertDialog
        open={openEdit}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return
          setOpenEdit(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar</AlertDialogTitle>
            <AlertDialogDescription>
              Preencha o formulário abaixo caso deseje alterar os dados do
              produto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Salvar Alterações</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={openDelete}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return
          setOpenDelete(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir</AlertDialogTitle>
            <AlertDialogDescription>
              Você está excluindo o produto{' '}
              <span className="text-red-500">{name}</span> e os dados excluídos
              não poderão ser recuperados. Tem certeza que deseja fazer isso?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
