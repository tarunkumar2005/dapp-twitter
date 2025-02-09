import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Tweet } from "@/types/Tweet";
import { toast } from "@/hooks/use-toast";
import { Twitter } from "@/types/TwitterContract";

interface TwitterState {
  tweets: Tweet[];
  loading: boolean;
  hasMoreTweets: boolean;
  page: number;
  username?: string;
}

const initialState: TwitterState = {
  tweets: [],
  loading: false,
  hasMoreTweets: true,
  page: 1,
  username: "",
};

export const createTweet = createAsyncThunk<void, { tweetContent: string; contract: Twitter }>(
  'twitter/createTweet',
  async ({ tweetContent, contract }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const ts = await contract.createTweet(tweetContent);
      await ts.wait();

      toast({
        title: "Tweet Created",
        description: "Your tweet has been successfully posted!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error creating tweet",
        variant: "destructive",
      });
    }
  }
);

export const getTweetsForFeed = createAsyncThunk<Tweet[], { page: number; contract: Twitter }>(
  'twitter/getTweetsForFeed',
  async ({ page, contract }, thunkAPI) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const tweetIds = await contract.getPaginatedTweetIds(page, 10);
      if (tweetIds.length === 0) {
        thunkAPI.dispatch(twitterSlice.actions.setHasMoreTweets(false));
        return [];
      }

      const tweetPromises = tweetIds.map((tweetId: bigint) => contract.getTweetDetails(tweetId));
      const tweetDetails = await Promise.all(tweetPromises);

      const likesPromises = tweetIds.map(async (tweetId: bigint) => {
        const [, authors] = await contract.getTweetLikes(tweetId);
        return authors;
      });
      const tweetLikes = await Promise.all(likesPromises);

      const formattedTweets = tweetDetails.map(
        (tweet: [bigint, string, string, string, bigint, bigint, bigint], index: number) => ({
          id: tweet[0].toString(),
          author: tweet[1],
          authorName: tweet[2],
          content: tweet[3],
          timestamp: tweet[4].toString(),
          likesCount: Number(tweet[5]),
          commentsCount: Number(tweet[6]),
          // Convert the returned likedBy value to a mutable array of strings:
          likedBy: Array.isArray(tweetLikes[index])
            ? tweetLikes[index].map((author: any) => author.toString())
            : [],
        })
      );      

      return formattedTweets;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching tweets",
        variant: "destructive",
      })
      return [];
    }
  }
)

export const likeTweet = createAsyncThunk<{ tweetId: string, account: string }, { tweetId: string, contract: Twitter, account: string }>(
  'twitter/likeTweet',
  async ({ tweetId, contract, account }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const ts = await contract.likeTweet(BigInt(tweetId));
      const receipt = await ts.wait();

      if (!receipt || receipt.status !== 1) {
        throw new Error('Error liking tweet');
      }

      toast({
        title: "Tweet Liked",
        description: "You have successfully liked the tweet!",
      });
      return { tweetId, account };
    } catch (error) {
      console.error(error);
      toast({
        title: "Error liking tweet",
        variant: "destructive",
      })
      return { tweetId: "", account: "" };
    }
  })

export const unlikeTweet = createAsyncThunk<{ tweetId: string, account: string }, { tweetId: string, contract: Twitter, account: string }>(
  'twitter/unlikeTweet',
  async ({ tweetId, contract, account }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const ts = await contract.unlikeTweet(BigInt(tweetId));
      const receipt = await ts.wait();

      if (!receipt || receipt.status !== 1) {
        throw new Error('Error unliking tweet');
      }

      toast({
        title: "Tweet Unliked",
        description: "You have successfully unliked the tweet!",
      });

      return { tweetId, account };
    } catch (error) {
      console.error(error);
      toast({
        title: "Error unliking tweet",
        variant: "destructive",
      })
      return { tweetId: "", account: "" };
    }
  }
)

export const deleteTweet = createAsyncThunk<string, { tweetId: string, contract: Twitter }>(
  'twitter/deleteTweet',
  async ({ tweetId, contract }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const ts = await contract.deleteTweet(BigInt(tweetId));
      const receipt = await ts.wait();

      if (!receipt || receipt.status !== 1) {
        throw new Error('Error deleting tweet');
      }

      toast({
        title: "Tweet Deleted",
        description: "You have successfully deleted the tweet!",
      });

      return tweetId;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting tweet",
        variant: "destructive",
      })
      return "";
    }
  } 
)

export const isUsernameAvailable = createAsyncThunk<boolean, { username: string, contract: Twitter }>(
  'twitter/isUsernameAvailable',
  async ({ username, contract }) => {{
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const available = await contract.isUsernameAvailable(username);
      return available;
    } catch (error) {
      console.error(error);
      return false;
    }
  }}
)

export const getUserName = createAsyncThunk<string, { account: string, contract: Twitter }>(
  'twitter/getUserName',
  async ({ account, contract }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const username = await contract.getUserName(account);
      return username;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
)

export const setUserName = createAsyncThunk<string, { username: string, contract: Twitter }>(
  'twitter/setUserName',
  async ({ username, contract }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const ts = await contract.setUserName(username);
      await ts.wait();

      toast({
        title: "Username Set",
        description: "Your username has been successfully set!",
      });
      return username;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error setting username",
        variant: "destructive",
      });
      return "Anonymous";
    }
  }
)

const twitterSlice = createSlice({
  name: "twitter",
  initialState,
  reducers: {
    setHasMoreTweets(state, action: PayloadAction<boolean>) {
      state.hasMoreTweets = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweet.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getTweetsForFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTweetsForFeed.fulfilled, (state, action) => {
        state.loading = false
        const newTweets = action.payload.filter(
          (newTweet) => !state.tweets.some((existingTweet) => existingTweet.id === newTweet.id),
        )
        state.tweets = [...state.tweets, ...newTweets]
        if (action.payload.length === 0) {
          state.hasMoreTweets = false
        } else {
          state.page += 1
        }
      })
      .addCase(getTweetsForFeed.rejected, (state) => {
        state.loading = false;
      })
      .addCase(likeTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeTweet.fulfilled, (state, action) => {
        state.loading = false;
        const tweet = state.tweets.find((t) => t.id === action.payload.tweetId);
        if (tweet) {
          tweet.likesCount += 1;
          if (action.payload.account) {
            tweet.likedBy.push(action.payload.account);
          }
        }
      })
      .addCase(likeTweet.rejected, (state) => {
        state.loading = false;
      })
      .addCase(unlikeTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(unlikeTweet.fulfilled, (state, action) => {
        state.loading = false;
        const tweet = state.tweets.find((t) => t.id === action.payload.tweetId);
        if (tweet) {
          tweet.likesCount -= 1;
          if (action.payload.account) {
            tweet.likedBy = tweet.likedBy.filter((addr) => addr !== action.payload.account);
          }
        }
      })
      .addCase(unlikeTweet.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = state.tweets.filter((tweet) => tweet.id !== action.payload);
      })
      .addCase(deleteTweet.rejected, (state) => {
        state.loading = false;
      })
      .addCase(isUsernameAvailable.pending, (state) => {
        state.loading = true;
      })
      .addCase(isUsernameAvailable.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(isUsernameAvailable.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload;
      })
      .addCase(getUserName.rejected, (state) => {
        state.loading = false;
      })
      .addCase(setUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(setUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload;
      })
      .addCase(setUserName.rejected, (state) => {
        state.loading = false;
      })
  }
});

export const { setHasMoreTweets, incrementPage } = twitterSlice.actions;
export default twitterSlice.reducer;