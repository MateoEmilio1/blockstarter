import { renderHook, act } from '@testing-library/react'
import { useMint } from '@/app/hooks/useMint'
import { useWriteContract } from 'wagmi'
import { parseUnits } from 'viem/utils'
import { Address, Token } from '@/app/types'

jest.mock('@/lib/utils', () => ({
  getTokenAddress: (token: Token) =>
    token === 'DAI'
      ? '0x1D70D57ccD2798323232B2dD027B3aBcA5C00091'
      : '0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47',
  getTokenDecimals: (token: string) => (token === 'DAI' ? 18 : 6),
}))

describe('useMint hook', () => {
  const account = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
  const mintAmount = '10'
  const token = 'DAI'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return transaction hash on successful mint', async () => {
    const dummyTxHash: Address =
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    ;(parseUnits as jest.Mock).mockReturnValue(BigInt(1000))

    const mockWriteContract = jest.fn().mockResolvedValue(dummyTxHash)
    ;(useWriteContract as jest.Mock).mockReturnValue({
      writeContract: mockWriteContract,
      data: null,
      error: null,
      reset: jest.fn(),
      status: 'idle',
    })

    const { result } = renderHook(() => useMint(mintAmount, token, account))
    let txHash: Address | undefined
    await act(async () => {
      txHash = (await result.current.handleMint()) as Address | undefined
    })

    expect(txHash).toBe(dummyTxHash)
    expect(mockWriteContract).toHaveBeenCalledWith({
      address: '0x1D70D57ccD2798323232B2dD027B3aBcA5C00091',
      abi: expect.arrayContaining([expect.objectContaining({ name: 'mint' })]),
      functionName: 'mint',
      args: [account, BigInt(1000)],
    })
  })

  test('should throw an error when mint fails', async () => {
    const dummyError = new Error('Mint failed')
    ;(parseUnits as jest.Mock).mockReturnValue(BigInt(1000))
    const mockWriteContract = jest.fn().mockRejectedValue(dummyError)
    ;(useWriteContract as jest.Mock).mockReturnValue({
      writeContract: mockWriteContract,
      data: null,
      error: dummyError,
      reset: jest.fn(),
      status: 'error',
    })

    const { result } = renderHook(() => useMint(mintAmount, token, account))
    await act(async () => {
      await expect(result.current.handleMint()).rejects.toThrow('Mint failed')
    })
  })
})
