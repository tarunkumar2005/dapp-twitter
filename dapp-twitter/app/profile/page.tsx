"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { useWeb3 } from "@/hooks/use-web3"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  const { account, username } = useWeb3()

  return (
    <MainLayout>
      <div className="min-h-[200px] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <div className="text-center space-y-4">
          <Avatar className="w-32 h-32 mx-auto border-4 border-background shadow-xl hover:scale-105 transition-transform duration-200">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="text-2xl font-bold">
              {username?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {username || "Anonymous"}
            </h1>
            <p className="text-muted-foreground font-medium">
              @{account?.toLowerCase().slice(2, 8)}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}