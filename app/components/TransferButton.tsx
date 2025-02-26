'use client'

import React, { useState, useEffect } from 'react'
import WalletChainCheckButton from '@/app/components/WalletChainCheckButton'
import { useTransferFrom } from '@/app/hooks/useTransferFrom'
import { useTokenBalance } from '@/app/hooks/useTokenBalance'
import { getTokenAddress, getTokenDecimals, formatTokenBalance } from '@/lib/utils'
import { Address, Token } from '@/app/types'
import Confetti from 'react-confetti-boom'
import { isAddress } from 'viem'

interface TransferButtonProps {
  sendAmount: string
  selectedToken: Token
  account: Address
  recipient: Address
  onTransferSuccess: () => void
  onError: (message: string) => void
}

export default function TransferButton({
  sendAmount,
  selectedToken,
  account,
  recipient,
  onTransferSuccess,
  onError,
}: TransferButtonProps) {
  const tokenAddress = getTokenAddress(selectedToken)
  const decimals = getTokenDecimals(selectedToken)
  const {
    balance,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useTokenBalance(tokenAddress, decimals)

  const [showRetry, setShowRetry] = useState(false)
  const [localTxHash, setLocalTxHash] = useState<string | null>(null)

  const {
    handleTransferFrom,
    reset: resetTransfer,
    isLoading,
    error,
    transactionHash,
  } = useTransferFrom(sendAmount, selectedToken, account, recipient)

  useEffect(() => {
    if (transactionHash && !localTxHash) {
      setLocalTxHash(transactionHash)
    }
  }, [transactionHash, localTxHash])

  useEffect(() => {
    setShowRetry(!!localTxHash || !!error)
  }, [localTxHash, error])

  const handleTransferTransaction = async () => {
    try {
      const txHash = await handleTransferFrom()
      if (typeof txHash !== 'string' || !txHash)
        throw new Error('No response from the transaction.')
      setLocalTxHash(txHash)
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError(err.message || 'Error sending transaction')
      } else {
        onError('Unknown error sending transaction')
      }
    }
  }

  const handleReset = () => {
    resetTransfer()
    setLocalTxHash(null)
    setShowRetry(false)
    onTransferSuccess()
  }

  const isTransferDisabled = !recipient || !sendAmount || !isAddress(recipient)
  const transferButtonText = isLoading ? 'Processing...' : 'Transfer'

  const availableBalance =
    !isBalanceLoading && !isBalanceError ? parseFloat(formatTokenBalance(balance)) : 0
  const sendAmountNumber = parseFloat(sendAmount) || 0
  const notEnoughBalance =
    !isBalanceLoading && !isBalanceError && sendAmount && sendAmountNumber > availableBalance

  return (
    <div>
      {!localTxHash && !error && (
        <>
          {notEnoughBalance ? (
            <WalletChainCheckButton
              onClick={() => {}}
              isLoading={false}
              disabled
              className="w-full p-4 rounded-lg text-white bg-gray-600"
            >
              Not enough funds
            </WalletChainCheckButton>
          ) : (
            <WalletChainCheckButton
              onClick={handleTransferTransaction}
              isLoading={isLoading}
              disabled={isTransferDisabled}
              className="w-full p-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
            >
              {transferButtonText}
            </WalletChainCheckButton>
          )}
        </>
      )}

      {localTxHash && (
        <>
          <WalletChainCheckButton
            onClick={() => {}}
            isLoading={false}
            disabled
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            🎉 Transfer Successful!
          </WalletChainCheckButton>
          <Confetti />
        </>
      )}

      {error && !localTxHash && (
        <WalletChainCheckButton
          onClick={() => {}}
          isLoading={false}
          disabled
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          An error has occurred
        </WalletChainCheckButton>
      )}

      {showRetry && (
        <WalletChainCheckButton
          onClick={handleReset}
          isLoading={false}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2"
        >
          Make another transfer
        </WalletChainCheckButton>
      )}
    </div>
  )
}
