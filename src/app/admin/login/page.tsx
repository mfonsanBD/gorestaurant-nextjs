import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { LoginForm } from '@/components/LoginForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: `Área Administrativa - Login - ${process.env.APPNAME}`,
}

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/admin/produtos')
  }
  return (
    <>
      <Header />

      <main className="mx-auto mt-0 max-w-7xl p-6 lg:-mt-20 lg:px-8">
        <div className="mx-auto max-w-96 space-y-4 rounded-lg bg-white p-6 lg:p-8">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-zinc-600">
            Entre em sua conta
          </h2>

          <div>
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  )
}
