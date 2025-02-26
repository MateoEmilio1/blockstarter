import { renderHook, act } from '@testing-library/react'
import { useTransferFrom } from '@/app/hooks/useTransferFrom'
import { useWriteContract } from 'wagmi'
import { parseUnits } from 'viem/utils'

let writeContractState = {
  data: undefined,
  status: 'pending',
  error: null,
}

const mockWriteContract = jest.fn()
const mockReset = jest.fn()
const mockedUseWriteContract = useWriteContract as jest.Mock
const mockedParseUnits = parseUnits as jest.Mock

describe('useTransferFrom hook', () => {
  const dummySender = '0xSenderDummy'
  const dummyRecipient = '0xRecipientDummy'
  const token = 'DAI' as const
  const amount = '10'
  const parsedAmountDummy = BigInt('10000000000000000000')

  beforeEach(() => {
    jest.clearAllMocks()

    writeContractState = {
      data: undefined,
      status: 'pending',
      error: null,
    }

    mockedParseUnits.mockReturnValue(parsedAmountDummy)

    mockedUseWriteContract.mockImplementation(() => ({
      writeContract: mockWriteContract,
      data: writeContractState.data,
      status: writeContractState.status,
      error: writeContractState.error,
      reset: mockReset,
    }))
  })

  test('should return final transaction data on successful transfer', async () => {
    const dummyTxHash = '0xTransferTxHash'
    mockWriteContract.mockResolvedValue(dummyTxHash)

    const { result } = renderHook(() => useTransferFrom(amount, token, dummySender, dummyRecipient))

    let finalTxHash: string | void = undefined
    await act(async () => {
      finalTxHash = await result.current.handleTransferFrom()
    })

    expect(finalTxHash).toBe(dummyTxHash)

    expect(mockWriteContract).toHaveBeenCalledWith({
      address: '0xDAIAddressDummy',
      abi: expect.arrayContaining([expect.objectContaining({ name: 'transferFrom' })]),
      functionName: 'transferFrom',
      args: [dummySender, dummyRecipient, parsedAmountDummy],
    })
  })

  test('should reject if transfer fails', async () => {
    const dummyError = new Error('Transfer failed')
    mockWriteContract.mockRejectedValue(dummyError)

    const { result } = renderHook(() => useTransferFrom(amount, token, dummySender, dummyRecipient))

    await act(async () => {
      await expect(result.current.handleTransferFrom()).rejects.toThrow('Transfer failed')
    })
  })
})
