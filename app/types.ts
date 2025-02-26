export type Address = `0x${string}`
export type Token = 'DAI' | 'USDC'
export type LogEventArgs = {
  from?: string
  owner?: string
  to?: string
  spender?: string
  value?: bigint | string
}

export type LogEvent = {
  token: string
  eventName: string
  args: LogEventArgs
  transactionHash: string
}
