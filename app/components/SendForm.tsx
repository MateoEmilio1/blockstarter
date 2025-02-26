import React from 'react'
import AmountInput from '@/app/components/AmountInput'
import TokenSelector from '@/app/components/TokenSelector'
import RecipientInput from '@/app/components/RecipientInput'
import SendButton from '@/app/components/SendButton'

export default function SendForm() {
  return (
    <div className="space-y-4">
      <AmountInput />

      <TokenSelector />

      <RecipientInput />

      <SendButton />
    </div>
  )
}
