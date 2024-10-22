/* eslint-disable no-unused-vars */
'use client'

import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'

type InputTextProps = {
  label?: string
  labelFor?: string
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
  Icon?: LucideIcon
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>

export default function InputText({
  Icon,
  label,
  labelFor,
  error = '',
  isRequired = false,
  isDisabled = false,
  value,
  onChange,
  ...props
}: InputTextProps) {
  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={labelFor}
          className={clsx('flex gap-1', {
            'text-zinc-600': !error && !isDisabled,
            'text-red-500': error,
            'cursor-not-allowed opacity-20': isDisabled,
          })}
        >
          {label}: {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="relative mt-1 h-12 w-full">
        <Input
          id={labelFor}
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          {...props}
          className={clsx('absolute h-12 w-full py-4', {
            'pl-12': !!Icon,
            'border border-red-500': error,
            'border border-zinc-300': !error,
          })}
        />

        {!!Icon && (
          <Icon className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" />
        )}
      </div>

      {error && <small className="mt-2 text-red-500">{error}</small>}
    </div>
  )
}
