/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace Twitter {
  export type TweetStruct = {
    id: BigNumberish;
    author: AddressLike;
    content: string;
    timestamp: BigNumberish;
  };

  export type TweetStructOutput = [
    id: bigint,
    author: string,
    content: string,
    timestamp: bigint
  ] & { id: bigint; author: string; content: string; timestamp: bigint };
}

export interface TwitterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "MAX_TWEET_LENGTH"
      | "MIN_TWEET_LENGTH"
      | "changeTweetMaxandMinLength"
      | "commentCounter"
      | "commentIndex"
      | "commentOnTweet"
      | "commentToTweet"
      | "createTweet"
      | "deleteComment"
      | "deleteTweet"
      | "getCommentDetails"
      | "getPaginatedTweetIds"
      | "getRandomCommentIds"
      | "getTweetDetails"
      | "getTweetLikes"
      | "getTweetOfSpecificUser"
      | "getUserName"
      | "isUsernameAvailable"
      | "isUsernameTaken"
      | "likeCounter"
      | "likeTweet"
      | "owner"
      | "setUserName"
      | "tweetComments"
      | "tweetCounter"
      | "tweetIds"
      | "tweetLikeIndex"
      | "tweetLikedBy"
      | "tweetLikes"
      | "tweets"
      | "unlikeTweet"
      | "userNames"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "CommentCreated"
      | "CommentDeleted"
      | "TweetCreated"
      | "TweetDeleted"
      | "TweetLiked"
      | "TweetUnliked"
      | "UserNameSet"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "MAX_TWEET_LENGTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_TWEET_LENGTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "changeTweetMaxandMinLength",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commentCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "commentIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commentOnTweet",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "commentToTweet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "createTweet", values: [string]): string;
  encodeFunctionData(
    functionFragment: "deleteComment",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deleteTweet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCommentDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPaginatedTweetIds",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRandomCommentIds",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTweetDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTweetLikes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTweetOfSpecificUser",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserName",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isUsernameAvailable",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isUsernameTaken",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "likeCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "likeTweet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "setUserName", values: [string]): string;
  encodeFunctionData(
    functionFragment: "tweetComments",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tweetCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tweetIds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tweetLikeIndex",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tweetLikedBy",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tweetLikes",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tweets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unlikeTweet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userNames",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_TWEET_LENGTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_TWEET_LENGTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeTweetMaxandMinLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commentCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commentIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commentOnTweet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commentToTweet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createTweet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deleteComment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deleteTweet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCommentDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaginatedTweetIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRandomCommentIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTweetDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTweetLikes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTweetOfSpecificUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUsernameAvailable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUsernameTaken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "likeCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "likeTweet", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setUserName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tweetComments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tweetCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tweetIds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tweetLikeIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tweetLikedBy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tweetLikes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tweets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unlikeTweet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userNames", data: BytesLike): Result;
}

export namespace CommentCreatedEvent {
  export type InputTuple = [
    tweetId: BigNumberish,
    commentId: BigNumberish,
    author: AddressLike,
    content: string,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    tweetId: bigint,
    commentId: bigint,
    author: string,
    content: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    tweetId: bigint;
    commentId: bigint;
    author: string;
    content: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CommentDeletedEvent {
  export type InputTuple = [
    tweetId: BigNumberish,
    commentId: BigNumberish,
    author: AddressLike,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    tweetId: bigint,
    commentId: bigint,
    author: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    tweetId: bigint;
    commentId: bigint;
    author: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TweetCreatedEvent {
  export type InputTuple = [
    tweetId: BigNumberish,
    author: AddressLike,
    content: string,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    tweetId: bigint,
    author: string,
    content: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    tweetId: bigint;
    author: string;
    content: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TweetDeletedEvent {
  export type InputTuple = [tweetId: BigNumberish];
  export type OutputTuple = [tweetId: bigint];
  export interface OutputObject {
    tweetId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TweetLikedEvent {
  export type InputTuple = [
    tweetId: BigNumberish,
    author: AddressLike,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    tweetId: bigint,
    author: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    tweetId: bigint;
    author: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TweetUnlikedEvent {
  export type InputTuple = [
    tweetId: BigNumberish,
    author: AddressLike,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    tweetId: bigint,
    author: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    tweetId: bigint;
    author: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UserNameSetEvent {
  export type InputTuple = [user: AddressLike, name: string];
  export type OutputTuple = [user: string, name: string];
  export interface OutputObject {
    user: string;
    name: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Twitter extends BaseContract {
  connect(runner?: ContractRunner | null): Twitter;
  waitForDeployment(): Promise<this>;

  interface: TwitterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  MAX_TWEET_LENGTH: TypedContractMethod<[], [bigint], "view">;

  MIN_TWEET_LENGTH: TypedContractMethod<[], [bigint], "view">;

  changeTweetMaxandMinLength: TypedContractMethod<
    [_maxTweetLength: BigNumberish, _minTweetLength: BigNumberish],
    [void],
    "nonpayable"
  >;

  commentCounter: TypedContractMethod<[], [bigint], "view">;

  commentIndex: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  commentOnTweet: TypedContractMethod<
    [_tweetId: BigNumberish, _comment: string],
    [void],
    "nonpayable"
  >;

  commentToTweet: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  createTweet: TypedContractMethod<[_tweet: string], [void], "nonpayable">;

  deleteComment: TypedContractMethod<
    [_commentId: BigNumberish],
    [void],
    "nonpayable"
  >;

  deleteTweet: TypedContractMethod<
    [_tweetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getCommentDetails: TypedContractMethod<
    [_commentId: BigNumberish],
    [[bigint, string, string, bigint]],
    "view"
  >;

  getPaginatedTweetIds: TypedContractMethod<
    [page: BigNumberish, pageSize: BigNumberish],
    [bigint[]],
    "view"
  >;

  getRandomCommentIds: TypedContractMethod<
    [_tweetId: BigNumberish, count: BigNumberish],
    [bigint[]],
    "view"
  >;

  getTweetDetails: TypedContractMethod<
    [_tweetId: BigNumberish],
    [[bigint, string, string, string, bigint, bigint, bigint]],
    "view"
  >;

  getTweetLikes: TypedContractMethod<
    [_tweetId: BigNumberish],
    [[bigint[], string[], bigint[]]],
    "view"
  >;

  getTweetOfSpecificUser: TypedContractMethod<
    [_user: AddressLike],
    [Twitter.TweetStructOutput[]],
    "view"
  >;

  getUserName: TypedContractMethod<[_user: AddressLike], [string], "view">;

  isUsernameAvailable: TypedContractMethod<[_name: string], [boolean], "view">;

  isUsernameTaken: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  likeCounter: TypedContractMethod<[], [bigint], "view">;

  likeTweet: TypedContractMethod<
    [_tweetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  setUserName: TypedContractMethod<[_name: string], [void], "nonpayable">;

  tweetComments: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, string, string, bigint] & {
        id: bigint;
        author: string;
        content: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  tweetCounter: TypedContractMethod<[], [bigint], "view">;

  tweetIds: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  tweetLikeIndex: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;

  tweetLikedBy: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;

  tweetLikes: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, string, bigint] & {
        id: bigint;
        author: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  tweets: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, bigint] & {
        id: bigint;
        author: string;
        content: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  unlikeTweet: TypedContractMethod<
    [_tweetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  userNames: TypedContractMethod<[arg0: AddressLike], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "MAX_TWEET_LENGTH"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MIN_TWEET_LENGTH"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "changeTweetMaxandMinLength"
  ): TypedContractMethod<
    [_maxTweetLength: BigNumberish, _minTweetLength: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "commentCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "commentIndex"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "commentOnTweet"
  ): TypedContractMethod<
    [_tweetId: BigNumberish, _comment: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "commentToTweet"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "createTweet"
  ): TypedContractMethod<[_tweet: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deleteComment"
  ): TypedContractMethod<[_commentId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deleteTweet"
  ): TypedContractMethod<[_tweetId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getCommentDetails"
  ): TypedContractMethod<
    [_commentId: BigNumberish],
    [[bigint, string, string, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPaginatedTweetIds"
  ): TypedContractMethod<
    [page: BigNumberish, pageSize: BigNumberish],
    [bigint[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRandomCommentIds"
  ): TypedContractMethod<
    [_tweetId: BigNumberish, count: BigNumberish],
    [bigint[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTweetDetails"
  ): TypedContractMethod<
    [_tweetId: BigNumberish],
    [[bigint, string, string, string, bigint, bigint, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTweetLikes"
  ): TypedContractMethod<
    [_tweetId: BigNumberish],
    [[bigint[], string[], bigint[]]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTweetOfSpecificUser"
  ): TypedContractMethod<
    [_user: AddressLike],
    [Twitter.TweetStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserName"
  ): TypedContractMethod<[_user: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "isUsernameAvailable"
  ): TypedContractMethod<[_name: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "isUsernameTaken"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "likeCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "likeTweet"
  ): TypedContractMethod<[_tweetId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setUserName"
  ): TypedContractMethod<[_name: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "tweetComments"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, string, string, bigint] & {
        id: bigint;
        author: string;
        content: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "tweetCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "tweetIds"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "tweetLikeIndex"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "tweetLikedBy"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "tweetLikes"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, string, bigint] & {
        id: bigint;
        author: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "tweets"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, bigint] & {
        id: bigint;
        author: string;
        content: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "unlikeTweet"
  ): TypedContractMethod<[_tweetId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "userNames"
  ): TypedContractMethod<[arg0: AddressLike], [string], "view">;

  getEvent(
    key: "CommentCreated"
  ): TypedContractEvent<
    CommentCreatedEvent.InputTuple,
    CommentCreatedEvent.OutputTuple,
    CommentCreatedEvent.OutputObject
  >;
  getEvent(
    key: "CommentDeleted"
  ): TypedContractEvent<
    CommentDeletedEvent.InputTuple,
    CommentDeletedEvent.OutputTuple,
    CommentDeletedEvent.OutputObject
  >;
  getEvent(
    key: "TweetCreated"
  ): TypedContractEvent<
    TweetCreatedEvent.InputTuple,
    TweetCreatedEvent.OutputTuple,
    TweetCreatedEvent.OutputObject
  >;
  getEvent(
    key: "TweetDeleted"
  ): TypedContractEvent<
    TweetDeletedEvent.InputTuple,
    TweetDeletedEvent.OutputTuple,
    TweetDeletedEvent.OutputObject
  >;
  getEvent(
    key: "TweetLiked"
  ): TypedContractEvent<
    TweetLikedEvent.InputTuple,
    TweetLikedEvent.OutputTuple,
    TweetLikedEvent.OutputObject
  >;
  getEvent(
    key: "TweetUnliked"
  ): TypedContractEvent<
    TweetUnlikedEvent.InputTuple,
    TweetUnlikedEvent.OutputTuple,
    TweetUnlikedEvent.OutputObject
  >;
  getEvent(
    key: "UserNameSet"
  ): TypedContractEvent<
    UserNameSetEvent.InputTuple,
    UserNameSetEvent.OutputTuple,
    UserNameSetEvent.OutputObject
  >;

  filters: {
    "CommentCreated(uint256,uint256,address,string,uint256)": TypedContractEvent<
      CommentCreatedEvent.InputTuple,
      CommentCreatedEvent.OutputTuple,
      CommentCreatedEvent.OutputObject
    >;
    CommentCreated: TypedContractEvent<
      CommentCreatedEvent.InputTuple,
      CommentCreatedEvent.OutputTuple,
      CommentCreatedEvent.OutputObject
    >;

    "CommentDeleted(uint256,uint256,address,uint256)": TypedContractEvent<
      CommentDeletedEvent.InputTuple,
      CommentDeletedEvent.OutputTuple,
      CommentDeletedEvent.OutputObject
    >;
    CommentDeleted: TypedContractEvent<
      CommentDeletedEvent.InputTuple,
      CommentDeletedEvent.OutputTuple,
      CommentDeletedEvent.OutputObject
    >;

    "TweetCreated(uint256,address,string,uint256)": TypedContractEvent<
      TweetCreatedEvent.InputTuple,
      TweetCreatedEvent.OutputTuple,
      TweetCreatedEvent.OutputObject
    >;
    TweetCreated: TypedContractEvent<
      TweetCreatedEvent.InputTuple,
      TweetCreatedEvent.OutputTuple,
      TweetCreatedEvent.OutputObject
    >;

    "TweetDeleted(uint256)": TypedContractEvent<
      TweetDeletedEvent.InputTuple,
      TweetDeletedEvent.OutputTuple,
      TweetDeletedEvent.OutputObject
    >;
    TweetDeleted: TypedContractEvent<
      TweetDeletedEvent.InputTuple,
      TweetDeletedEvent.OutputTuple,
      TweetDeletedEvent.OutputObject
    >;

    "TweetLiked(uint256,address,uint256)": TypedContractEvent<
      TweetLikedEvent.InputTuple,
      TweetLikedEvent.OutputTuple,
      TweetLikedEvent.OutputObject
    >;
    TweetLiked: TypedContractEvent<
      TweetLikedEvent.InputTuple,
      TweetLikedEvent.OutputTuple,
      TweetLikedEvent.OutputObject
    >;

    "TweetUnliked(uint256,address,uint256)": TypedContractEvent<
      TweetUnlikedEvent.InputTuple,
      TweetUnlikedEvent.OutputTuple,
      TweetUnlikedEvent.OutputObject
    >;
    TweetUnliked: TypedContractEvent<
      TweetUnlikedEvent.InputTuple,
      TweetUnlikedEvent.OutputTuple,
      TweetUnlikedEvent.OutputObject
    >;

    "UserNameSet(address,string)": TypedContractEvent<
      UserNameSetEvent.InputTuple,
      UserNameSetEvent.OutputTuple,
      UserNameSetEvent.OutputObject
    >;
    UserNameSet: TypedContractEvent<
      UserNameSetEvent.InputTuple,
      UserNameSetEvent.OutputTuple,
      UserNameSetEvent.OutputObject
    >;
  };
}