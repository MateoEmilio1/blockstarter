import { useWriteContract } from 'wagmi'
import { erc20Abi } from '@/app/utils/abi'
import { parseUnits } from 'viem/utils'
import { Address, Token } from '@/app/types'
import { getTokenAddress, getTokenDecimals } from '@/lib/utils'

export const useTransferFrom = (
  amount: string,
  token: Token,
  sender: Address,
  recipient: Address,
) => {
  const decimals = getTokenDecimals(token)
  const tokenAddress = getTokenAddress(token)
  const parsedAmount = amount ? parseUnits(amount, decimals) : BigInt(0)

  const { data, writeContract, error, reset, status } = useWriteContract()

  const isIdle = status === 'idle'
  const isLoading = status === 'pending'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  const handleTransferFrom = async () => {
    try {
      const txHash = await writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'transferFrom',
        args: [sender, recipient, parsedAmount],
      })
      return txHash
    } catch (err) {
      throw err
    }
  }

  return {
    handleTransferFrom,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    error,
    transactionHash: data,
    reset,
    status,
  }
}
