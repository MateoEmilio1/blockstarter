'use client'

import React, { useState } from 'react'
import { useApprove } from '@/app/hooks/useApprove'
import { Address, Token } from '@/app/types'
import WalletChainCheckButton from '@/app/components/WalletChainCheckButton'

interface ApproveButtonProps {
  sendAmount: string
  selectedToken: Token
  account: Address
  onApproveSuccess: () => void
  onError: (message: string) => void
  disabled: boolean
}

export default function ApproveButton({
  sendAmount,
  selectedToken,
  account,
  onApproveSuccess,
  onError,
  disabled,
}: ApproveButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { handleApprove, reset: resetApprove } = useApprove(sendAmount, selectedToken, account)

  const handleApproveTransaction = async () => {
    setIsLoading(true)
    try {
      const approveHash = (await handleApprove()) as Address | undefined
      if (!approveHash) {
        throw new Error('No response from the approval transaction.')
      }
      onApproveSuccess()
    } catch (error: unknown) {
      if (error instanceof Error) {
        onError(error.message || 'Error sending approval transaction')
      } else {
        onError('Unknown error sending approval transaction')
      }
    } finally {
      setIsLoading(false)
      resetApprove()
    }
  }

  return (
    <div>
      <WalletChainCheckButton
        onClick={handleApproveTransaction}
        isLoading={isLoading}
        disabled={disabled}
      >
        Approve
      </WalletChainCheckButton>
    </div>
  )
}
