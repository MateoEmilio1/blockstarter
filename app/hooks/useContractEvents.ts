import { useState, useCallback } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { DAI_ADDRESS, USDC_ADDRESS } from '@/app/utils/addresses'
import { erc20Abi } from '@/app/utils/abi'
import { LogEvent } from '../types'

export const useContractEvents = () => {
  const [events, setEvents] = useState<LogEvent[]>([])

  const addEvents = useCallback((newEvents: LogEvent[]) => {
    setEvents(prevEvents => [...prevEvents, ...newEvents])
  }, [])

  const tokenMapping: Record<string, string> = {
    [DAI_ADDRESS.toLowerCase()]: 'DAI',
    [USDC_ADDRESS.toLowerCase()]: 'USDC',
  }

  useWatchContractEvent({
    address: [DAI_ADDRESS, USDC_ADDRESS],
    abi: erc20Abi,
    eventName: 'Transfer',
    onLogs: logs => {
      const formatted = logs.map(log => ({
        ...log,
        token: tokenMapping[log.address.toLowerCase()] || 'Unknown',
        eventName: 'Transfer',
      }))
      addEvents(formatted)
    },
  })

  useWatchContractEvent({
    address: [DAI_ADDRESS, USDC_ADDRESS],
    abi: erc20Abi,
    eventName: 'Approval',
    onLogs: logs => {
      const formatted = logs.map(log => ({
        ...log,
        token: tokenMapping[log.address.toLowerCase()] || 'Unknown',
        eventName: 'Approval',
      }))
      addEvents(formatted)
    },
  })

  return { events }
}
