'use client'

import React from 'react'
import { Button, ButtonProps } from '@/app/components/ui/button'
import { useReactiveAccount } from '../hooks/useReactiveAccount'

interface WalletChainCheckButtonProps extends ButtonProps {
  onClick: () => void
  isLoading?: boolean
  children: React.ReactNode
}

const WalletChainCheckButton: React.FC<WalletChainCheckButtonProps> = ({
  onClick,
  isLoading,
  children,
  disabled,
  className = 'bg-blue-600 hover:bg-blue-700',
  ...props
}) => {
  const { address, chain } = useReactiveAccount()

  if (!address) {
    return (
      <Button disabled className="w-full p-4 rounded-lg text-white bg-gray-600">
        Please connect a wallet
      </Button>
    )
  }

  if (!chain || chain.id !== 11155111) {
    return (
      <Button disabled className="w-full p-4 rounded-lg text-white bg-gray-600">
        Wrong network, please switch to Sepolia
      </Button>
    )
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      {...props}
      className={`w-full p-4 rounded-lg text-white ${isLoading || disabled ? 'bg-gray-600' : className}`}
    >
      {isLoading ? 'Processing...' : children}
    </Button>
  )
}

export default WalletChainCheckButton
