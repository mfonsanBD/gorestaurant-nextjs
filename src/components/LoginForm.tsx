/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { LoaderCircle } from 'lucide-react'

const schema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.'),
  password: z.string().nonempty('A senha é obrigatória.'),
})

type SignInFormProps = z.infer<typeof schema>

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormProps>({
    resolver: zodResolver(schema),
  })

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmitSignInForm = useCallback(
    async (data: any) => {
      const result = await signIn('credentials', { ...data, redirect: false })

      if (result?.error) {
        toast({
          title: 'Erro:',
          description: result?.error,
          variant: 'destructive',
        })
      } else {
        reset()
        router.replace('/admin/produtos')
      }
    },
    [reset, toast, router],
  )
  return (
    <form onSubmit={handleSubmit(handleSubmitSignInForm)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Endereço de e-mail: <span className="text-red-500">*</span>
        </label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <div className="mt-1">
              <input
                id="email"
                name={name}
                type="email"
                value={value}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="email"
                className="border-1 focus:border-1 block h-12 w-full rounded-md border-zinc-200 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-within:ring-0 focus:border-zinc-200 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          )}
        />
        {errors.email && (
          <small className="mt-1 text-red-500">{errors.email.message}</small>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Senha de acesso: <span className="text-red-500">*</span>
          </label>
          <div className="text-sm">
            <Link
              href="/admin/esqueci-minha-senha"
              className="text-xs font-medium text-yellow-500 transition-colors hover:text-yellow-400"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <div className="mt-1">
              <input
                id="password"
                name={name}
                type="password"
                value={value}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="current-password"
                className="border-1 focus:border-1 block h-12 w-full rounded-md border-zinc-200 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-within:ring-0 focus:border-zinc-200 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          )}
        />
        {errors.password && (
          <small className="mt-1 text-red-500">{errors.password.message}</small>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline-none focus-visible:outline-offset-0"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <LoaderCircle size={24} className="animate-spin" />
              <p>Aguarde um momento</p>
            </div>
          ) : (
            'Entrar'
          )}
        </button>
      </div>
    </form>
  )
}
