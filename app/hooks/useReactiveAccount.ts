import { getAccount } from '@wagmi/core'
import { config } from '@/lib/config'
import { useState, useEffect } from 'react'

export function useReactiveAccount() {
  const [account, setAccount] = useState(getAccount(config))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAccount(getAccount(config))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return account
}
