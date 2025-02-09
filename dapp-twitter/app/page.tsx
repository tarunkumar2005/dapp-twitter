"use client"

import { useEffect, useCallback, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { ComposeTweet } from "@/components/tweet/ComposeTweet"
import { TweetCard } from "@/components/tweet/TweetCard"
import { useAppDispatch, useAppSelector } from "@/hooks/use-store"
import { getTweetsForFeed, setHasMoreTweets } from "@/lib/features/TwitterSlice"
import { useWeb3 } from "@/hooks/use-web3"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.twitter.loading)
  const tweets = useAppSelector((state) => state.twitter.tweets)
  const hasMoreTweets = useAppSelector((state) => state.twitter.hasMoreTweets)
  const page = useAppSelector((state) => state.twitter.page)
  const { contract } = useWeb3()
  const [isFetching, setIsFetching] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  const fetchTweets = useCallback(async () => {
    if (contract && !loading && hasMoreTweets && !isFetching) {
      setIsFetching(true)
      await dispatch(getTweetsForFeed({ page, contract }))
      setIsFetching(false)
    }
  }, [contract, loading, hasMoreTweets, dispatch, page, isFetching])

  useEffect(() => {
    if (tweets.length === 0) {
      fetchTweets()
    }
  }, [fetchTweets, tweets.length])

  useEffect(() => {
    if (inView && !isFetching) {
      fetchTweets()
    }
  }, [inView, fetchTweets, isFetching])

  useEffect(() => {
    if (contract) {
      dispatch(setHasMoreTweets(true))
    }
  }, [contract, dispatch])

  return (
    <MainLayout>
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <h1 className="p-4 text-xl font-semibold">Home</h1>
      </div>

      <div className="border-b">
        <ComposeTweet onSuccess={fetchTweets} />
      </div>

      <div>
        {loading && tweets.length === 0 ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 border-b flex space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[400px]" />
              </div>
            </div>
          ))
        ) : tweets.length > 0 ? (
          <>
            {tweets.map((tweet) => (
              <TweetCard key={tweet.id.toString()} tweet={tweet} />
            ))}
            {hasMoreTweets && (
              <div ref={ref} className="p-4 text-center text-gray-500">
                {isFetching ? <Skeleton className="h-4 w-32 mx-auto" /> : <p>Load more tweets</p>}
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No tweets yet. Be the first to tweet!</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}