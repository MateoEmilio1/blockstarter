'use client'

import React from 'react'
import { useTokenBalance } from '@/app/hooks/useTokenBalance'
import { formatTokenBalance } from '@/lib/utils'
import { Token } from '@/app/types'
import { getTokenAddress, getTokenDecimals } from '@/lib/utils'

interface TokenBalanceProps {
  token: Token
  label?: string
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ token, label }) => {
  const tokenAddress = getTokenAddress(token)
  const decimals = getTokenDecimals(token)
  const { balance, isLoading, isError } = useTokenBalance(tokenAddress, decimals)

  if (isLoading) {
    return <span>Loading {token}...</span>
  }

  if (isError) {
    return <span className="text-red-500">Error loading {token}</span>
  }

  return (
    <div className="text-white text-left">
      {label && <h3 className="font-medium">{label}</h3>}
      <p className="text-base text-gray-500">Balance: {formatTokenBalance(balance)}</p>
    </div>
  )
}

export default TokenBalance
