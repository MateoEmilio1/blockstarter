import { renderHook } from '@testing-library/react'
import { useTokenBalance } from '@/app/hooks/useTokenBalance'
import { useAccount, useReadContract } from 'wagmi'
import { formatUnits } from 'viem/utils'

describe('useTokenBalance hook', () => {
  const dummyAccount = '0xDummyAccount'
  const dummyTokenAddress = '0xDummyTokenAddress'
  const decimals = 18

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns "0" balance when no data is available', () => {
    ;(useAccount as jest.Mock).mockReturnValue({ address: dummyAccount })
    ;(useReadContract as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    })

    const { result } = renderHook(() => useTokenBalance(dummyTokenAddress, decimals))
    expect(result.current.balance).toBe('0')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  test('returns formatted balance when data is available', () => {
    const dummyBigInt = BigInt(1000000000000000000)
    const formattedBalance = '1.0'
    ;(useAccount as jest.Mock).mockReturnValue({ address: dummyAccount })
    ;(useReadContract as jest.Mock).mockReturnValue({
      data: dummyBigInt,
      isLoading: false,
      isError: false,
    })
    ;(formatUnits as jest.Mock).mockReturnValue(formattedBalance)

    const { result } = renderHook(() => useTokenBalance(dummyTokenAddress, decimals))
    expect(formatUnits).toHaveBeenCalledWith(dummyBigInt, decimals)
    expect(result.current.balance).toBe(formattedBalance)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  test('returns loading state when useReadContract is loading', () => {
    ;(useAccount as jest.Mock).mockReturnValue({ address: dummyAccount })
    ;(useReadContract as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    })

    const { result } = renderHook(() => useTokenBalance(dummyTokenAddress, decimals))
    expect(result.current.isLoading).toBe(true)
    expect(result.current.balance).toBe('0')
  })

  test('returns error state when useReadContract has error', () => {
    ;(useAccount as jest.Mock).mockReturnValue({ address: dummyAccount })
    ;(useReadContract as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    })

    const { result } = renderHook(() => useTokenBalance(dummyTokenAddress, decimals))
    expect(result.current.isError).toBe(true)
    expect(result.current.balance).toBe('0')
  })

  test('returns "0" balance when no account is connected', () => {
    ;(useAccount as jest.Mock).mockReturnValue({ address: undefined })
    ;(useReadContract as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    })

    const { result } = renderHook(() => useTokenBalance(dummyTokenAddress, decimals))
    expect(result.current.balance).toBe('0')
  })
})
