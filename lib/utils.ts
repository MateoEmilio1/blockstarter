import { Address, Token } from '@/app/types'
import { DAI_ADDRESS, USDC_ADDRESS } from '@/app/utils/addresses'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tokens = [
  { id: 'DAI', name: 'DAI', logo: '/dai-logo.svg' },
  { id: 'USDC', name: 'USDC', logo: '/usdc-logo.svg' },
] as const

export const getTokenAddress = (token: Token): Address => {
  switch (token) {
    case 'DAI':
      return DAI_ADDRESS
    case 'USDC':
      return USDC_ADDRESS
    default:
      throw new Error('Token no soportado')
  }
}

export const getTokenDecimals = (token: Token): number => {
  switch (token) {
    case 'DAI':
      return 18
    case 'USDC':
      return 6
    default:
      throw new Error('Token no soportado')
  }
}

export function formatTokenBalance(balance: string): string {
  const num = Number(balance)

  if (num >= 10) {
    return Math.floor(num).toString()
  }

  const parts = balance.split('.')
  if (parts.length === 2 && Number(parts[1]) === 0) {
    return parts[0]
  }

  return balance
}
