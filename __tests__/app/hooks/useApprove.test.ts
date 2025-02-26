import { renderHook, act } from '@testing-library/react'
import { useApprove } from '@/app/hooks/useApprove'
import { useWriteContract } from 'wagmi'
import { parseUnits } from 'viem/utils'

describe('useApprove hook', () => {
  const dummyAccount = '0xAccountDummy'
  const token = 'DAI' as const
  const amount = '20'
  const parsedAmountDummy = BigInt('20000000000000000000')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return final transaction data on successful approval', async () => {
    const dummyTxHash = '0xApproveTxHash'
    ;(parseUnits as jest.Mock).mockReturnValue(parsedAmountDummy)

    const mockWriteContract = jest.fn().mockResolvedValue(dummyTxHash)
    ;(useWriteContract as jest.Mock).mockReturnValue({
      writeContract: mockWriteContract,
      data: dummyTxHash,
      error: null,
      reset: jest.fn(),
      status: 'success',
    })

    const { result } = renderHook(() => useApprove(amount, token, dummyAccount))
    let finalTxHash: string | undefined = undefined
    await act(async () => {
      finalTxHash = await result.current.handleApprove()
    })

    expect(finalTxHash).toBe(dummyTxHash)
    expect(mockWriteContract).toHaveBeenCalledWith({
      address: '0xDAIAddressDummy',
      abi: expect.arrayContaining([expect.objectContaining({ name: 'approve' })]),
      functionName: 'approve',
      args: [dummyAccount, parsedAmountDummy],
    })
  })

  test('should reject if approval fails', async () => {
    const dummyError = new Error('Approval failed')
    ;(parseUnits as jest.Mock).mockReturnValue(parsedAmountDummy)
    const mockWriteContract = jest.fn().mockRejectedValue(dummyError)
    ;(useWriteContract as jest.Mock).mockReturnValue({
      writeContract: mockWriteContract,
      data: null,
      error: dummyError,
      reset: jest.fn(),
      status: 'error',
    })

    const { result } = renderHook(() => useApprove(amount, token, dummyAccount))
    await act(async () => {
      await expect(result.current.handleApprove()).rejects.toThrow('Approval failed')
    })
  })
})
