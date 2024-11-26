/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { editProduct } from '@/actions/product'
import InputText from './InputText'
import { LoaderCircle } from 'lucide-react'
import { Button } from './ui/button'
import { AlertDialogCancel, AlertDialogFooter } from './ui/alert-dialog'
import { CurrencyInput } from 'react-currency-mask'

import { Label } from './ui/label'
import { Input } from './ui/input'
import clsx from 'clsx'
import { ChangeFileToBase64 } from '@/utils/helpers'
import axios from 'axios'

const schema = z.object({
  name: z.string().nonempty('O campo [Produto] é obrigatório.'),
  description: z.string().nonempty('O campo [Descrição] é obrigatório.'),
  photo: z
    .any()
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: 'O arquivo não pode exceder 2MB.',
    })
    .refine((file) => /\.(jpeg|jpg|png)$/i.test(file.name), {
      message: 'O arquivo deve ser uma imagem (JPEG, JPG ou PNG).',
    })
    .optional(),
  price: z.number().refine((value) => value > 0, {
    message: 'O campo [Preço] é obrigatório.',
  }),
})

type EditProductFormProps = z.infer<typeof schema>

export interface ProductPageProps {
  onModalOpen: (v: boolean) => void
  product: ProductsProps
}

export const EditProductForm = ({ onModalOpen, product }: ProductPageProps) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<EditProductFormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: product.description,
      name: product.name,
      price: product.price,
    },
  })

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    const acceptsFileType = ['image/png', 'image/jpeg', 'image/jpg']
    const fileLimitSize = 2097152

    if (file) {
      if (!acceptsFileType.includes(file.type)) {
        setError('photo', {
          message: 'O arquivo deve ser uma imagem (JPEG, JPG ou PNG).',
        })
      } else if (file.size > fileLimitSize) {
        setError('photo', {
          message: 'O arquivo não pode exceder 2MB.',
        })
      } else {
        clearErrors('photo')
        setValue('photo', file)
      }
    } else {
      console.log('Arquivo vazio')
    }
  }

  const { toast } = useToast()

  const handleSubmitEditProduct = useCallback(
    async (data: EditProductFormProps) => {
      let allData

      if (data.photo) {
        const file = (await ChangeFileToBase64(data.photo)) as string
        const photo = await (await axios.post('/api/saveFile', { file })).data

        allData = {
          ...data,
          id: product.id,
          photo,
        }
      } else {
        allData = { ...data, photo: product.photo, id: product.id }
      }

      const result = await editProduct(allData)

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
    [reset, toast, onModalOpen, product],
  )

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(handleSubmitEditProduct)}
    >
      <div>
        <Controller
          name="photo"
          control={control}
          defaultValue={undefined}
          render={() => (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="photo" className="font-medium text-zinc-600">
                Foto:
              </Label>
              <Input
                id="photo"
                type="file"
                onChange={handleChangeImage}
                className={clsx('w-full cursor-pointer py-3', {
                  'border border-red-500 focus:border-red-500': errors.photo,
                  'border border-zinc-300': !errors.photo,
                })}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          )}
        />
        {errors.photo && (
          <small className="text-red-500">
            {errors.photo.message?.toString()}
          </small>
        )}
      </div>

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
        defaultValue={0}
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
              <p>Salvando...</p>
            </div>
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      </AlertDialogFooter>
    </form>
  )
}
