import { renderHook } from '@testing-library/react'
import { useAllowance } from '@/app/hooks/useAllowance'
import { useReadContract } from 'wagmi'
import { formatUnits } from 'viem/utils'

const dummyTokenAddress = '0x1111111111111111111111111111111111111111'
const dummyOwner = '0x2222222222222222222222222222222222222222'
const dummySpender = '0x3333333333333333333333333333333333333333'
const decimals = 18

const mockedUseReadContract = useReadContract as jest.Mock
const mockedFormatUnits = formatUnits as jest.Mock

describe('useAllowance hook', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('retorna "0" en allowance cuando no hay data disponible', () => {
    mockedUseReadContract.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    })

    const { result } = renderHook(() =>
      useAllowance(dummyTokenAddress, decimals, dummyOwner, dummySpender),
    )

    expect(result.current.allowance).toBe('0')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  test('retorna el allowance formateado cuando hay data disponible', () => {
    const dummyData = BigInt('1000000000000000000')
    const formattedAllowance = '1.0'
    mockedUseReadContract.mockReturnValue({
      data: dummyData,
      isLoading: false,
      isError: false,
    })
    mockedFormatUnits.mockReturnValue(formattedAllowance)

    const { result } = renderHook(() =>
      useAllowance(dummyTokenAddress, decimals, dummyOwner, dummySpender),
    )

    expect(mockedFormatUnits).toHaveBeenCalledWith(dummyData, decimals)
    expect(result.current.allowance).toBe(formattedAllowance)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  test('propaga los flags isLoading e isError correctamente', () => {
    mockedUseReadContract.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: true,
    })

    const { result } = renderHook(() =>
      useAllowance(dummyTokenAddress, decimals, dummyOwner, dummySpender),
    )

    expect(result.current.allowance).toBe('0')
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(true)
  })
})
