'use client'

import React, { useState, useEffect } from 'react'
import { useTokenStore } from '@/app/store/tokenStore'
import { useAccount } from 'wagmi'
import ApproveButton from './ApproveButton'
import TransferButton from './TransferButton'
import { Address } from '@/app/types'
import { getTokenAddress, getTokenDecimals } from '@/lib/utils'
import { useAllowance } from '@/app/hooks/useAllowance'

export default function SendButton() {
  const { sendAmount, selectedToken, recipient } = useTokenStore()
  const { address: account } = useAccount()
  const [isApproved, setIsApproved] = useState(false)
  const tokenContractAddress = getTokenAddress(selectedToken)
  const decimals = getTokenDecimals(selectedToken)

  const {
    allowance,
    isLoading: isAllowanceLoading,
    isError: isAllowanceError,
  } = useAllowance(tokenContractAddress, decimals, account as Address, account as Address)

  useEffect(() => {
    if (!isAllowanceLoading && !isAllowanceError && sendAmount && account) {
      setIsApproved(parseFloat(allowance) >= parseFloat(sendAmount))
    }
  }, [allowance, isAllowanceLoading, isAllowanceError, sendAmount, account, selectedToken])

  const handleApproveSuccess = () => {
    setIsApproved(true)
  }

  const handleTransferSuccess = () => {
    setIsApproved(false)
  }

  const isApproveButtonEnabled =
    Boolean(sendAmount) &&
    !isAllowanceLoading &&
    !isAllowanceError &&
    parseFloat(sendAmount) > 0 &&
    parseFloat(allowance) < parseFloat(sendAmount)

  return (
    <div>
      {!isApproved ? (
        <ApproveButton
          sendAmount={sendAmount}
          selectedToken={selectedToken}
          account={account as Address}
          onApproveSuccess={handleApproveSuccess}
          onError={msg => console.log('Approve error:', msg)}
          disabled={!isApproveButtonEnabled}
        />
      ) : (
        <TransferButton
          sendAmount={sendAmount}
          selectedToken={selectedToken}
          account={account as Address}
          recipient={recipient as Address}
          onTransferSuccess={handleTransferSuccess}
          onError={msg => console.log('Transfer error:', msg)}
        />
      )}
    </div>
  )
}
