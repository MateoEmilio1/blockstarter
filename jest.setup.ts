import '@testing-library/jest-dom'

jest.mock('wagmi', () => ({
  useReadContract: jest.fn(),
  useWriteContract: jest.fn(),
  useWatchContractEvent: jest.fn(),
  useAccount: jest.fn(),
}))

jest.mock('viem/utils', () => ({
  formatUnits: jest.fn(),
  parseUnits: jest.fn(),
}))

jest.mock('@/lib/config', () => ({
  config: {
    appName: 'Test App',
    projectId: 'dummyProjectId',
    chains: [],
    ssr: false,
    transports: {},
  },
}))

jest.mock('@/app/utils/abi', () => ({
  erc20Abi: [
    {
      type: 'function',
      name: 'allowance',
      stateMutability: 'view',
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
      ],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'approve',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'mint',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'transferFrom',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'recipient', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [],
    },
  ],
}))

jest.mock('@/app/utils/addresses', () => ({
  DAI_ADDRESS: '0xDAIAddressDummy',
  USDC_ADDRESS: '0xUSDCAddressDummy',
}))
