import { APPNAME } from '@/app/layout'
import { Header } from '@/components/Header'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Área Administrativa - Login - ${APPNAME}`,
}

export default async function AdminLoginPage() {
  return (
    <>
      <Header />

      <main className="mx-auto mt-0 max-w-7xl p-6 lg:-mt-20 lg:px-8">
        <div className="mx-auto max-w-96 space-y-4 rounded-lg bg-white p-6 lg:p-8">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-zinc-600">
            Entre em sua conta
          </h2>

          <div>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Endereço de e-mail: <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="border-1 focus:border-1 block h-12 w-full rounded-md border-zinc-200 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-within:ring-0 focus:border-zinc-200 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
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
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="border-1 focus:border-1 block h-12 w-full rounded-md border-zinc-200 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-within:ring-0 focus:border-zinc-200 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline-none focus-visible:outline-offset-0"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
