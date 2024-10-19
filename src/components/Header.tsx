'use client'

import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Header = () => {
  const pathname = usePathname()
  return (
    <header className="bg-[#C72828]">
      <nav
        aria-label="Global"
        className={`mx-auto flex max-w-7xl items-center ${!pathname.includes('admin') ? 'justify-between' : 'justify-center'} p-6 lg:px-8 lg:pb-32 lg:pt-12`}
      >
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Go Restaurant</span>
            <img
              alt="Logotipo Go Restaurant"
              src="/img/logo.svg"
              className="h-12 w-auto"
            />
          </a>
        </div>

        {!pathname.includes('admin') && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button variant="secondary" asChild>
              <Link href="/admin/produtos">Acesso Restrito</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
