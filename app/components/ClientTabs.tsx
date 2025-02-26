import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs'
import dynamic from 'next/dynamic'

const SendForm = dynamic(() => import('./SendForm').then(mod => mod.default), { ssr: true })
const MintForm = dynamic(() => import('./MintForm').then(mod => mod.default), { ssr: true })

export default function SendAndMint() {
  return (
    <div className="dark max-w-lg mx-auto p-4 rounded-lg">
      <Tabs defaultValue="send">
        <TabsList className="flex justify-center bg-none p-2 rounded-lg ">
          <TabsTrigger value="send" className="text-white">
            Send
          </TabsTrigger>
          <TabsTrigger value="mint" className="text-white">
            Mint
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-col items-start w-full">
          <TabsContent value="send" className="w-full">
            <SendForm />
          </TabsContent>
          <TabsContent value="mint" className="w-full">
            <MintForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
