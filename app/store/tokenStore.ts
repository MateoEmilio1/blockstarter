import { create } from 'zustand'
import { Token } from '../types'

interface TokenStore {
  selectedToken: Token
  sendAmount: string
  recipient: string
  setSelectedToken: (token: Token) => void
  setSendAmount: (amount: string) => void
  setRecipient: (recipient: string) => void
}

export const useTokenStore = create<TokenStore>(set => ({
  selectedToken: 'DAI',
  sendAmount: '',
  recipient: '',
  setSelectedToken: token => set({ selectedToken: token }),
  setSendAmount: amount => set({ sendAmount: amount }),
  setRecipient: recipient => set({ recipient }),
}))
