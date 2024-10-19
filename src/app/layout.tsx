import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/auth'

const poppins = Poppins({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  preload: false,
  variable: '--font-poppins',
})

export const APPNAME: string = 'Go Restaurant'

export const metadata: Metadata = {
  title: `Cardápio - ${APPNAME}`,
  description: `Acompanhe a lista de produtos no cardápio da ${APPNAME}`,
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
      </body>
    </html>
  )
}
