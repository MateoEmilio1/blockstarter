'use client'

import type { FC } from 'react'
import Image from 'next/image'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/app/components/ui/select'
import { useTokenStore } from '@/app/store/tokenStore'
import TokenBalance from './TokenBalance'
import { tokens } from '@/lib/utils'
import { useAccount } from 'wagmi'

const TokenSelector: FC = () => {
  const { selectedToken, setSelectedToken } = useTokenStore()
  const { isConnected } = useAccount()

  return (
    <div className="flex flex-col p-4 space-y-2 bg-gray-800 pb-6 rounded-xl">
      <label className="text-sm text-gray-400 mb-2 mt-2">Token</label>
      <Select value={selectedToken} onValueChange={setSelectedToken}>
        <SelectTrigger className="w-full bg-gray-800 text-white p-2 rounded-lg flex items-center justify-between border">
          <div className="flex items-center">
            <Image
              src={tokens.find(t => t.id === selectedToken)?.logo || ''}
              alt={`${selectedToken} logo`}
              width={52}
              height={52}
              className="mr-2"
            />
            <div className="ml-2 text-xl font-semibold">
              {isConnected ? (
                <TokenBalance token={selectedToken} label={`${selectedToken}`} />
              ) : (
                <span>{selectedToken}</span>
              )}
            </div>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 mt-2 w-full">
          {tokens.map(({ id, name, logo }) => (
            <SelectItem key={id} value={id}>
              <div className="flex items-center">
                <Image src={logo} alt={`${name} logo`} width={52} height={52} className="mr-2" />
                <span>{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
TokenSelector.displayName = 'TokenSelector'
export default TokenSelector
