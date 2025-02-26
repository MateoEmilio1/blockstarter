'use client'

import { useAccount, useReadContract } from 'wagmi'
import { erc20Abi } from '../utils/abi'
import { formatUnits } from 'viem/utils'
import { config } from '@/lib/config'
import { Address } from '@/app/types'

/**
 * Generic hook to read the balance of an ERC-20 token using useReadContract.
 * @param tokenAddress Contract address of the token.
 * @param decimals Number of decimals of the token.
 */

export function useTokenBalance(tokenAddress: string, decimals: number) {
  const { address } = useAccount()

  const { data, isError, isLoading } = useReadContract({
    address: tokenAddress as Address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    config,
    args: [address as Address],
  })

  const balanceFormatted = data ? formatUnits(data as bigint, decimals) : '0'

  return { balance: balanceFormatted, isLoading, isError }
}
