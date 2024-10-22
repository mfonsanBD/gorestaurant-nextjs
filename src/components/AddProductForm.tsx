/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { addProduct } from '@/actions/product'
import InputText from './InputText'
import { LoaderCircle } from 'lucide-react'
import { Button } from './ui/button'
import { AlertDialogCancel, AlertDialogFooter } from './ui/alert-dialog'
import { CurrencyInput } from 'react-currency-mask'
import { useSession } from 'next-auth/react'

const schema = z.object({
  name: z.string().nonempty('O campo [Produto] é obrigatório.'),
  description: z.string().nonempty('O campo [Descrição] é obrigatório.'),
  photo: z
    .string()
    .url('Link da foto inválida')
    .nonempty('O campo [Foto] é obrigatório.'),
  price: z
    .number({
      invalid_type_error: 'O valor deve ser um número',
    })
    .refine((value) => value !== null && value !== undefined, {
      message: 'O campo [Preço] é obrigatório.',
    })
    .refine((value) => value > 0, {
      message: 'O número deve ser maior que zero',
    }),
})

type AddProductFormProps = z.infer<typeof schema>

export interface ProductPageProps {
  onModalOpen: (v: boolean) => void
}

export const AddProductForm = ({ onModalOpen }: ProductPageProps) => {
  const { data: session } = useSession()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AddProductFormProps>({
    resolver: zodResolver(schema),
  })

  const { toast } = useToast()

  const handleSubmitAddProduct = useCallback(
    async (data: AddProductFormProps) => {
      const allData = { ...data, userId: session?.user.id }
      const result = await addProduct(allData)

      if (result.statusCode === 201) {
        reset()
        onModalOpen(false)
        toast({
          title: 'Sucesso:',
          description: result.message,
          variant: 'default',
        })
      } else if (result.statusCode === 500) {
        toast({
          title: 'Erro:',
          description: result.message,
          variant: 'destructive',
        })
      }
    },
    [reset, toast, onModalOpen, session],
  )

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSubmitAddProduct)}>
      <Controller
        name="photo"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            label="Foto"
            type="photo"
            labelFor="photo"
            placeholder="Ex.: https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg"
            isRequired
            onChange={onChange}
            isDisabled={isSubmitting}
            error={errors?.photo?.message}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            label="Produto"
            type="name"
            labelFor="name"
            placeholder="Ex.: Hamburguer"
            isRequired
            onChange={onChange}
            isDisabled={isSubmitting}
            error={errors?.name?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            label="Descrição"
            labelFor="description"
            placeholder="Ex.: Pão Australiano, hamburguer de picanha de 120g, bacon, cheddar, etc..."
            isRequired
            onChange={onChange}
            isDisabled={isSubmitting}
            error={errors?.description?.message}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CurrencyInput
            value={value}
            onChangeValue={(_, value) => {
              onChange(value as string)
            }}
            InputElement={
              <InputText
                label="Preço"
                labelFor="price"
                placeholder="Ex.: R$ 80,99"
                isRequired
                isDisabled={isSubmitting}
                error={errors?.price?.message}
              />
            }
          />
        )}
      />

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <LoaderCircle size={24} className="animate-spin" />
              <p>Adicionando...</p>
            </div>
          ) : (
            'Adicionar'
          )}
        </Button>
      </AlertDialogFooter>
    </form>
  )
}
