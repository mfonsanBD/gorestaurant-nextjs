'use client'

export const Header = () => {
  return (
    <header className="bg-[#C72828]">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8 lg:pb-32 lg:pt-12"
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
      </nav>
    </header>
  )
}
