import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Tweet } from "@/types/Tweet";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {
  likeTweet,
  unlikeTweet,
  deleteTweet,
} from "@/lib/features/TwitterSlice";
import { useWeb3 } from "@/hooks/use-web3";

interface TweetCardProps {
  tweet: Tweet;
  onComment?: () => void;
}

export function TweetCard({ tweet, onComment }: TweetCardProps) {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.twitter.username);
  const { account, contract } = useWeb3();
  const isLiked = account
    ? tweet.likedBy
        .map((addr) => addr.toLowerCase())
        .includes(account.toLowerCase())
    : false;

  const handleLike = async () => {
    if (isLiked) {
      if (contract && account) {
        await dispatch(
          unlikeTweet({ tweetId: tweet.id, contract, account })
        ).unwrap();
      }
    } else {
      if (contract && account) {
        await dispatch(
          likeTweet({ tweetId: tweet.id, contract, account })
        ).unwrap();
      }
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tweet?")) return;
    if (contract) {
      await dispatch(deleteTweet({ tweetId: tweet.id, contract })).unwrap();
    }
  };

  return (
    <article className="p-4 border-b hover:bg-accent/5 transition-colors">
      <div className="flex space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage className="text-2xl font-bold">
              {username
                ? (() => {
                    const parts = username.trim().split(/\s+/).filter(Boolean);
                    if (parts.length >= 2) {
                      return (
                        parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
                      );
                    }
                    return username.trim()[0].toUpperCase();
                  })()
                : "AN"}
            </AvatarImage>
            <AvatarFallback className="text-2xl font-bold">
              {username
                ? (() => {
                    const parts = username.trim().split(/\s+/).filter(Boolean);
                    if (parts.length >= 2) {
                      return (
                        parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
                      );
                    }
                    return username.trim()[0].toUpperCase();
                  })()
                : "AN"}
            </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{tweet.authorName}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                {formatDistanceToNow(Number(tweet.timestamp) * 1000)}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                >
                  Delete Tweet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="mt-2 text-[15px] leading-normal">{tweet.content}</p>

          <div className="flex items-center justify-between mt-4 text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary"
              onClick={onComment}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {tweet.commentsCount}
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-green-500">
              <Repeat2 className="h-4 w-4 mr-2" />0
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={
                isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "hover:text-red-500"
              }
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {tweet.likesCount}
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-primary">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
