import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY as string

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID as string,
  chains: [sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`),
  },
})
