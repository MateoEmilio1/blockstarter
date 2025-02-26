import { tokens, getTokenAddress, getTokenDecimals, formatTokenBalance } from '@/lib/utils'
import { DAI_ADDRESS, USDC_ADDRESS } from '@/app/utils/addresses'
import { Token } from '@/app/types'

describe('tokens', () => {
  test('should contain two tokens with correct properties', () => {
    expect(tokens).toHaveLength(2)
    expect(tokens).toEqual([
      { id: 'DAI', name: 'DAI', logo: '/dai-logo.svg' },
      { id: 'USDC', name: 'USDC', logo: '/usdc-logo.svg' },
    ])
  })
})

describe('getTokenAddress', () => {
  test('returns DAI address for token "DAI"', () => {
    expect(getTokenAddress('DAI')).toBe(DAI_ADDRESS)
  })

  test('returns USDC address for token "USDC"', () => {
    expect(getTokenAddress('USDC')).toBe(USDC_ADDRESS)
  })

  test('throws an error for unsupported tokens', () => {
    expect(() => getTokenAddress('XYZ' as Token)).toThrow('Token no soportado')
  })
})

describe('getTokenDecimals', () => {
  test('returns 18 for token "DAI"', () => {
    expect(getTokenDecimals('DAI')).toBe(18)
  })

  test('returns 6 for token "USDC"', () => {
    expect(getTokenDecimals('USDC')).toBe(6)
  })

  test('throws an error for unsupported tokens', () => {
    expect(() => getTokenDecimals('XYZ' as Token)).toThrow('Token no soportado')
  })
})

describe('formatTokenBalance', () => {
  test('returns floored value when number is greater than or equal to 10', () => {
    expect(formatTokenBalance('15.678')).toBe('15')
  })

  test('returns integer part when fractional part is zero', () => {
    expect(formatTokenBalance('9.0')).toBe('9')
  })

  test('returns the original balance when number is less than 10 and fractional part is non-zero', () => {
    expect(formatTokenBalance('9.123')).toBe('9.123')
  })
})
