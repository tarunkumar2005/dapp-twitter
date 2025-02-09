"use client"

import { useState } from "react"
import { useAppDispatch } from "@/hooks/use-store";
import { createTweet } from "@/lib/features/TwitterSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useWeb3 } from "@/hooks/use-web3"
import { Smile } from "lucide-react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ComposeTweetProps {
  onSuccess?: () => void
  onClose?: () => void
}

export function ComposeTweet({ onSuccess, onClose }: ComposeTweetProps) {
  const [content, setContent] = useState("")
  const dispatch = useAppDispatch()
  const { account, contract, username } = useWeb3()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      if (contract) {
        await dispatch(createTweet({ tweetContent: content, contract })).unwrap()
      }
      setContent("")
      onSuccess?.()
      onClose?.()
    } catch (error) {
      console.error("Failed to create tweet:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmojiSelect = (emoji: { native: string }) => {
    setContent((prevContent) => prevContent + emoji.native)
  }

  if (!account) {
    return <div className="p-4 text-center">Please connect your wallet to tweet</div>
  }

  return (
    <div className="p-4 bg-background">
      <div className="flex space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>
            {username?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="min-h-[120px] text-xl resize-none border-none focus:ring-0"
          />
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary rounded-full hover:bg-primary/10">
                    <Smile className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm text-primary font-medium">{280 - content.length}</span>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting || content.length > 280}
                className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? "Posting..." : "Tweet"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}