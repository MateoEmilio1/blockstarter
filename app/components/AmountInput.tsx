'use client'

import React from 'react'
import { useTokenStore } from '@/app/store/tokenStore'

export default function AmountInput() {
  const { sendAmount, selectedToken, setSendAmount } = useTokenStore()
  const placeholder = `0${selectedToken}`

  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-lg">
      <label className="text-sm text-gray-400 mb-1">You&apos;re sending</label>
      <input
        type="number"
        placeholder={placeholder}
        value={sendAmount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendAmount(e.target.value)}
        className="text-6xl text-center text-white font-semibold placeholder-gray-500 bg-transparent p-4 rounded-lg border-none w-full h-40"
      />
    </div>
  )
}
