'use client'

import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export const Header = () => {
  const pathname = usePathname()
  const { data } = useSession()
  return (
    <header className="bg-[#C72828]">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8 lg:pb-32 lg:pt-12"
      >
        <div className="flex w-full items-center justify-between gap-4">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Go Restaurant</span>
            <img
              alt="Logotipo Go Restaurant"
              src="/img/logo.svg"
              className="h-12 w-auto"
            />
          </a>

          {pathname.includes('admin') && data?.user && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-yellow-400 text-yellow-800 hover:bg-yellow-500"
                    onClick={() =>
                      signOut({
                        redirect: true,
                        callbackUrl: '/',
                      })
                    }
                  >
                    <LogOut />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sair do Sistema</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </nav>
    </header>
  )
}
