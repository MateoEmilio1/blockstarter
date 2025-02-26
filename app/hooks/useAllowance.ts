'use client'

import { useReadContract } from 'wagmi'
import { erc20Abi } from '@/app/utils/abi'
import { config } from '@/lib/config'
import { formatUnits } from 'viem/utils'
import { Address } from '@/app/types'

/**
 * Generic hook to read the allowance (approval) of an ERC-20 token.
 * @param tokenAddress Address of the token contract.
 * @param decimals Number of decimals of the token.
 * @param owner Address of the token owner.
 * @param spender Address authorized to spend the tokens.
 */

export function useAllowance(
  tokenAddress: string,
  decimals: number,
  owner: Address,
  spender: Address,
) {
  const { data, isError, isLoading } = useReadContract({
    address: tokenAddress as Address,
    abi: erc20Abi,
    functionName: 'allowance',
    config,
    args: [owner, spender],
  })

  const allowanceFormatted = data ? formatUnits(data as bigint, decimals) : '0'

  return { allowance: allowanceFormatted, isLoading, isError }
}
