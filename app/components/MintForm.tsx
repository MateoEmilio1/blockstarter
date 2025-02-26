'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import TokenSelector from './TokenSelector'
import WalletChainCheckButton from '@/app/components/WalletChainCheckButton'
import { useMint } from '@/app/hooks/useMint'
import { useAccount, useTransaction } from 'wagmi'
import { Address } from '@/app/types'
import { useTokenStore } from '@/app/store/tokenStore'
import { useQueryClient } from '@tanstack/react-query'
import Confetti from 'react-confetti-boom'
import { Button } from './ui/button'

const MintForm: React.FC = () => {
  const { address } = useAccount()
  const { selectedToken } = useTokenStore()
  const [mintAmount, setMintAmount] = useState<string>('')
  const [showRetry, setShowRetry] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { handleMint, data, error, status, resetMint } = useMint(
    mintAmount,
    selectedToken,
    address as Address,
  )

  const { data: txData } = useTransaction({
    hash: data,
  })

  useEffect(() => {
    setShowRetry(!!data || !!error)
  }, [data, error])

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    try {
      await handleMint()
      setMintAmount('')
      queryClient.invalidateQueries()
    } catch (err) {
      console.error('Error minting tokens:', err)
    }
  }

  const isMinting = status === 'pending'
  const canMint = mintAmount && !isMinting && !data && !error

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TokenSelector />
      <input
        type="number"
        placeholder="Amount to mint"
        value={mintAmount}
        onChange={e => setMintAmount(e.target.value)}
        className="w-full p-2 bg-gray-800 rounded-lg text-white"
      />

      {!error && !txData && (
        <WalletChainCheckButton
          onClick={handleSubmit}
          isLoading={isMinting}
          disabled={!canMint}
          type="submit"
          className={
            isMinting ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
          }
        >
          {isMinting ? 'Minting...' : 'Mint'}
        </WalletChainCheckButton>
      )}

      {txData && (
        <>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg"
            disabled
          >
            🎉 Mint successful!
          </Button>
          <Confetti />
        </>
      )}

      {error && (
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg" disabled>
          An error has occurred
        </Button>
      )}

      {showRetry && (
        <Button
          onClick={() => {
            resetMint()
            setShowRetry(false)
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg"
        >
          {data ? 'Mint again?' : 'Try again'}
        </Button>
      )}
    </form>
  )
}

export default MintForm
