'use client'

import React, { useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { useTokenStore } from '@/app/store/tokenStore'
import { isAddress } from 'viem'
import { useAccount } from 'wagmi'

export default function RecipientInput() {
  const { recipient, setRecipient } = useTokenStore()
  const { address: account } = useAccount()
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setRecipient(value)

    if (!value) {
      setError('Address is required')
      return
    }

    if (!isAddress(value)) {
      setError('Invalid Ethereum address')
      return
    }

    if (account && account.toLowerCase() === value.toLowerCase()) {
      setError('Warning: you are transferring to your own address')
      return
    }

    setError('')
  }

  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-xl">
      <label className="text-sm text-gray-400 mb-1">To</label>
      <Input
        type="text"
        placeholder="Wallet address"
        value={recipient}
        onChange={handleChange}
        className={`bg-gray-800 text-white p-2 rounded-lg ${error ? 'border border-red-500' : ''}`}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  )
}
