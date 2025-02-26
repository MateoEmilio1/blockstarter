import { useWriteContract } from 'wagmi'
import { erc20Abi } from '@/app/utils/abi'
import { parseUnits } from 'viem/utils'
import { Address, Token } from '@/app/types'
import { useEffect, useRef } from 'react'
import { getTokenAddress, getTokenDecimals } from '@/lib/utils'

export const useApprove = (amount: string, token: Token, account: Address) => {
  const decimals = getTokenDecimals(token)
  const tokenAddress = getTokenAddress(token)
  const parsedAmount = amount ? parseUnits(amount, decimals) : BigInt(0)
  const { data, writeContract, error, reset, status } = useWriteContract()

  const dataRef = useRef(data)
  const errorRef = useRef(error)
  const statusRef = useRef(status)

  useEffect(() => {
    statusRef.current = status
    dataRef.current = data
    errorRef.current = error
  }, [status, data, error])

  const isIdle = status === 'idle'
  const isLoading = status === 'pending'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  const handleApprove = async () => {
    try {
      await writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [account, parsedAmount],
      })

      const finalData = await new Promise<string>((resolve, reject) => {
        const interval = setInterval(() => {
          if (statusRef.current === 'success' && dataRef.current !== undefined) {
            clearInterval(interval)
            resolve(dataRef.current)
          } else if (statusRef.current === 'error') {
            clearInterval(interval)
            reject(errorRef.current)
          }
        }, 1000)
      })

      return finalData
    } catch (err) {
      throw err
    }
  }

  return {
    handleApprove,
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
