import { Home, User, Bell, Mail, Bookmark, Settings, PenSquare } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Logo } from '@/components/common/Logo'
import { WalletButton } from '@/components/common/WalletButton'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ComposeTweet } from '../tweet/ComposeTweet'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Sidebar() {
  return (
    <div className="w-64 fixed h-screen border-r">
      <div className="flex flex-col h-full p-4">
        <div className="mb-4">
          <Logo />
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-lg hover:bg-accent rounded-full transition-colors"
            >
              <item.icon className="h-6 w-6" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full rounded-full mt-4" size="lg">
              <PenSquare className="h-5 w-5 mr-2" />
              Tweet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ComposeTweet />
          </DialogContent>
        </Dialog>

        <div className="mt-auto">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}