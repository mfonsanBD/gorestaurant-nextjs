/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useCallback, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { addProduct } from '@/actions/product'
import InputText from './InputText'
import { LoaderCircle } from 'lucide-react'
import { Button } from './ui/button'
import { AlertDialogCancel, AlertDialogFooter } from './ui/alert-dialog'
import { CurrencyInput } from 'react-currency-mask'
import { useSession } from 'next-auth/react'

import { v4 as uuidv4 } from 'uuid'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { saveFromUrl } from '@/actions/saveImage'
import clsx from 'clsx'

const schema = z
  .object({
    name: z.string().nonempty('O campo [Produto] é obrigatório.'),
    description: z.string().nonempty('O campo [Descrição] é obrigatório.'),
    isUrl: z.boolean().default(true),
    url: z.string(),
    file: z
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
  .refine(
    (data) => {
      if (data.isUrl) {
        return data.url !== undefined
      } else {
        return data.file !== undefined
      }
    },
    {
      path: ['file'],
      message: 'O campo [Foto] é obrigatório.',
    },
  )

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
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<AddProductFormProps>({
    resolver: zodResolver(schema),
  })

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    const acceptsFileType = ['image/png', 'image/jpeg', 'image/jpg']
    const fileLimitSize = 2097152

    if (file) {
      if (!acceptsFileType.includes(file.type)) {
        setError('file', {
          message: 'O arquivo deve ser uma imagem (JPEG, JPG ou PNG).',
        })
      } else if (file.size > fileLimitSize) {
        setError('file', {
          message: 'O arquivo não pode exceder 2MB.',
        })
      } else {
        clearErrors('file')
        setValue('file', file)
      }
    } else {
      setError('file', { message: 'O campo [Foto] é obrigatório.' })
    }
  }

  const [photoIsUrl, setPhotoIsUrl] = useState(true)

  const handlePhotoIsUrl = (value: boolean) => {
    setPhotoIsUrl(value)
    setValue('isUrl', value)
  }

  const { toast } = useToast()

  const handleSubmitAddProduct = useCallback(
    async (data: AddProductFormProps) => {
      const fileName: string = `${uuidv4()}.jpg`

      if (photoIsUrl) {
        await saveFromUrl(data.url, fileName)
      } else {
        const formData = new FormData()
        formData.append('file', data.file as File)
        formData.append('fileName', fileName)

        await fetch(`/api/saveFile`, {
          method: 'POST',
          body: formData,
        })
      }

      const allData = { ...data, userId: session?.user.id, photo: fileName }
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
    [reset, toast, onModalOpen, session, photoIsUrl],
  )

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSubmitAddProduct)}>
      <div className="flex items-center gap-2">
        <Label htmlFor="isUrl">Envar Arquivo</Label>
        <Switch
          checked={photoIsUrl}
          onCheckedChange={handlePhotoIsUrl}
          id="isUrl"
          className="!mt-0"
        />
        <Label htmlFor="isUrl">Enviar Link</Label>
      </div>

      {photoIsUrl ? (
        <Controller
          name="url"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputText
              value={value as string}
              label="Foto"
              type="url"
              labelFor="url"
              placeholder="Ex.: https://media-cdn.tripadvisor.com/media/photo-s/1b/23/e6/c6/oi-sumido-que-tal-cebola.jpg"
              isRequired
              onChange={onChange}
              isDisabled={isSubmitting}
              error={errors?.url?.message}
            />
          )}
        />
      ) : (
        <div>
          <Controller
            name="file"
            control={control}
            defaultValue={undefined}
            render={() => (
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="file"
                  className={clsx('font-medium', {
                    'text-zinc-600': !errors.file,
                    'text-red-500': errors.file,
                  })}
                >
                  Foto: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleChangeImage}
                  className={clsx('w-full cursor-pointer py-3', {
                    'border border-red-500 focus:border-red-500': errors.file,
                    'border border-zinc-300': !errors.file,
                  })}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
            )}
          />
          {errors.file && (
            <small className="text-red-500">
              {errors.file.message?.toString()}
            </small>
          )}
        </div>
      )}

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
