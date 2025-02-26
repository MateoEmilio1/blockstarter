'use client'

import { useWriteContract } from 'wagmi'
import { parseUnits } from 'viem/utils'
import { getTokenAddress, getTokenDecimals } from '@/lib/utils'
import { erc20Abi } from '@/app/utils/abi'
import { Token, Address } from '@/app/types'

export const useMint = (mintAmount: string, token: Token, account: Address) => {
  const decimals = getTokenDecimals(token)
  const tokenAddress = getTokenAddress(token) as Address
  const parsedAmount = mintAmount ? parseUnits(mintAmount, decimals) : BigInt(0)

  const { writeContract, data, error, reset, status } = useWriteContract()

  const handleMint = async () => {
    try {
      const txHash = await writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'mint',
        args: [account, parsedAmount],
      })
      return txHash
    } catch (err) {
      throw err
    }
  }

  return { handleMint, data, error, resetMint: reset, status }
}
