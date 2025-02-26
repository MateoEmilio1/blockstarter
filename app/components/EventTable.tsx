'use client'

import React, { useState } from 'react'
import { useContractEvents } from '@/app/hooks/useContractEvents'
import { LogEvent } from '../types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Label } from '@/app/components/ui/label'

const EventTable: React.FC = () => {
  const { events } = useContractEvents()
  const [filterToken, setFilterToken] = useState<string>('All')

  const filteredEvents = events.filter((event: LogEvent) =>
    filterToken === 'All' ? true : event.token === filterToken,
  )

  const tokenOptions = ['All', 'DAI', 'USDC']

  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>Event Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Label htmlFor="tokenFilter" className="text-sm text-gray-300">
            Filter by token:
          </Label>
          <Select value={filterToken} onValueChange={setFilterToken}>
            <SelectTrigger id="tokenFilter" className="w-[180px] bg-gray-700 text-white">
              <SelectValue placeholder="Select a token" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700">
              {tokenOptions.map(option => (
                <SelectItem key={option} value={option} className="text-white">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full overflow-x-auto bg-gray-800">
          <Table className="text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-700">Token</TableHead>
                <TableHead className="bg-gray-700">Event</TableHead>
                <TableHead className="bg-gray-700">Amount</TableHead>
                <TableHead className="bg-gray-700">Sender</TableHead>
                <TableHead className="bg-gray-700">Recipient</TableHead>
                <TableHead className="bg-gray-700">Tx Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event: LogEvent, index: number) => {
                const sender = event.args.from || event.args.owner || 'N/A'
                const recipient = event.args.to || event.args.spender || 'N/A'
                const amount = event.args.value ? event.args.value.toString() : 'N/A'

                return (
                  <TableRow key={index} className="bg-gray-700">
                    <TableCell>{event.token}</TableCell>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>{amount}</TableCell>
                    <TableCell className="break-words">{sender}</TableCell>
                    <TableCell className="break-words">{recipient}</TableCell>
                    <TableCell className="break-words">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline cursor-pointer"
                      >
                        {event.transactionHash}
                      </a>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventTable
