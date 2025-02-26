import { renderHook, act } from '@testing-library/react'
import { useContractEvents } from '@/app/hooks/useContractEvents'
import { useWatchContractEvent } from 'wagmi'
import { DAI_ADDRESS, USDC_ADDRESS } from '@/app/utils/addresses'
import { LogEvent } from '@/app/types'

describe('useContractEvents', () => {
  let transferOnLogs: ((logs: LogEvent[]) => void) | undefined
  let approvalOnLogs: ((logs: LogEvent[]) => void) | undefined

  beforeEach(() => {
    ;(useWatchContractEvent as jest.Mock).mockClear()
    ;(useWatchContractEvent as jest.Mock).mockImplementation(({ eventName, onLogs }) => {
      if (eventName === 'Transfer') {
        transferOnLogs = onLogs
      }
      if (eventName === 'Approval') {
        approvalOnLogs = onLogs
      }
    })
  })

  test('adds Transfer event correctly', () => {
    const { result } = renderHook(() => useContractEvents())
    const dummyLog: LogEvent & { address: string } = {
      address: DAI_ADDRESS,
      args: { from: '0x111', to: '0x222', value: '100' },
      transactionHash: '0xTxHash1',
      token: '',
      eventName: '',
    }

    act(() => {
      if (transferOnLogs) {
        transferOnLogs([dummyLog])
      }
    })

    expect(result.current.events).toEqual([
      {
        ...dummyLog,
        token: 'DAI',
        eventName: 'Transfer',
      },
    ])
  })

  test('adds Approval event correctly', () => {
    const { result } = renderHook(() => useContractEvents())
    const dummyLog: LogEvent & { address: string } = {
      address: USDC_ADDRESS,
      args: { owner: '0x333', spender: '0x444', value: '200' },
      transactionHash: '0xTxHash2',
      token: '',
      eventName: '',
    }

    act(() => {
      if (approvalOnLogs) {
        approvalOnLogs([dummyLog])
      }
    })

    expect(result.current.events).toEqual([
      {
        ...dummyLog,
        token: 'USDC',
        eventName: 'Approval',
      },
    ])
  })

  test('concatenates multiple events correctly', () => {
    const { result } = renderHook(() => useContractEvents())
    const dummyTransferLog: LogEvent & { address: string } = {
      address: DAI_ADDRESS,
      args: { from: '0x111', to: '0x222', value: '150' },
      transactionHash: '0xTxHash3',
      token: '',
      eventName: '',
    }
    const dummyApprovalLog: LogEvent & { address: string } = {
      address: USDC_ADDRESS,
      args: { owner: '0x555', spender: '0x666', value: '300' },
      transactionHash: '0xTxHash4',
      token: '',
      eventName: '',
    }

    act(() => {
      if (transferOnLogs) {
        transferOnLogs([dummyTransferLog])
      }
    })

    act(() => {
      if (approvalOnLogs) {
        approvalOnLogs([dummyApprovalLog])
      }
    })

    expect(result.current.events).toEqual([
      {
        ...dummyTransferLog,
        token: 'DAI',
        eventName: 'Transfer',
      },
      {
        ...dummyApprovalLog,
        token: 'USDC',
        eventName: 'Approval',
      },
    ])
  })

  test('assigns token "Unknown" if the address is not mapped', () => {
    const { result } = renderHook(() => useContractEvents())
    const dummyLog: LogEvent & { address: string } = {
      address: '0xUnknownAddress',
      args: { from: '0xAAA', to: '0xBBB', value: '50' },
      transactionHash: '0xTxHash5',
      token: '',
      eventName: '',
    }

    act(() => {
      if (transferOnLogs) {
        transferOnLogs([dummyLog])
      }
    })

    expect(result.current.events).toEqual([
      {
        ...dummyLog,
        token: 'Unknown',
        eventName: 'Transfer',
      },
    ])
  })
})
