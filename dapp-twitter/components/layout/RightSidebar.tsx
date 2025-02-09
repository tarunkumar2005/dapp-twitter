import { SearchBar } from "../common/SearchBar"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Sparkles, TrendingUp, User } from "lucide-react"

export function RightSidebar() {
  const trends = [
    { topic: "Ethereum", count: "100K", category: "Crypto" },
    { topic: "Web3", count: "50K", category: "Technology" },
    { topic: "Blockchain", count: "25K", category: "Technology" },
    { topic: "NFTs", count: "75K", category: "Art" },
    { topic: "DeFi", count: "30K", category: "Finance" },
  ]

  const suggestedUsers = [
    { name: "Alice Blockchain", handle: "@alice_chain", avatar: "/avatars/alice.jpg" },
    { name: "Bob Crypto", handle: "@bob_crypto", avatar: "/avatars/bob.jpg" },
    { name: "Charlie NFT", handle: "@charlie_nft", avatar: "/avatars/charlie.jpg" },
  ]

  return (
    <div className="w-80 fixed right-0 h-screen p-4 space-y-4 overflow-y-auto">
      <SearchBar />

      <Card className="bg-gray-50 dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">What's happening</CardTitle>
          <Sparkles className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trends.map((trend, index) => (
              <div
                key={index}
                className="space-y-1 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors"
              >
                <p className="text-xs text-muted-foreground">{trend.category} · Trending</p>
                <p className="font-semibold">{trend.topic}</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <p className="text-xs text-muted-foreground">{trend.count} tweets</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="w-full mt-2 text-sm">
            Show more
          </Button>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground space-x-2">
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Cookie Policy
        </a>
        <p className="inline">© 2025 DTwitter, Inc.</p>
      </div>
    </div>
  )
}