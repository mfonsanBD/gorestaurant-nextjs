import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/auth'
import { Toaster } from '@/components/ui/toaster'

const poppins = Poppins({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  preload: false,
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: `Cardápio - ${process.env.APPNAME}`,
  description: `Acompanhe a lista de produtos no cardápio do restaurante ${process.env.APPNAME}`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
