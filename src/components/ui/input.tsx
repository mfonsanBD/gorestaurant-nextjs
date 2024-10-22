/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "'w-full focus:border-zinc-300' rounded-md border border-zinc-300 bg-background px-3 text-sm font-normal outline-none file:border-0 file:bg-transparent file:text-sm placeholder:font-normal placeholder:text-zinc-400 focus-within:outline-none focus:border-zinc-300 focus:outline-none focus:ring-0 focus:ring-zinc-300 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-zinc-300 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
