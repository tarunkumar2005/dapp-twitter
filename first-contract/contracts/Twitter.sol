// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Twitter {

  uint16 public MAX_TWEET_LENGTH = 280;
  uint8 public MIN_TWEET_LENGTH = 1;
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  struct Tweet {
    uint256 id;
    address author;
    string content;
    uint256 timestamp;
  }

  struct Like {
    uint256 id;
    address author;
    uint256 timestamp;
  }

  struct Comment {
    uint256 id;
    address author;
    string content;
    uint256 timestamp;
  }

  mapping(uint256 => Tweet) public tweets;
  uint256[] public tweetIds;

  mapping(address => string) public userNames;
  mapping(bytes32 => bool) public isUsernameTaken;

  mapping(uint256 => Like[]) public tweetLikes;
  mapping(uint256 => mapping(address => bool)) public tweetLikedBy;
  mapping(uint256 => mapping(address => uint256)) public tweetLikeIndex;

  mapping(uint256 => Comment[]) public tweetComments;
  mapping(uint256 => uint256) public commentToTweet;
  mapping(uint256 => uint256) public commentIndex;

  uint256 public tweetCounter = 1;
  uint256 public likeCounter = 1;
  uint256 public commentCounter = 1;

  event UserNameSet(address indexed user, string name);
  event TweetCreated(uint256 tweetId, address author, string content, uint256 timestamp);
  event TweetLiked(uint256 tweetId, address author, uint256 timestamp);
  event TweetUnliked(uint256 tweetId, address author, uint256 timestamp);
  event CommentCreated(uint256 tweetId, uint256 commentId, address author, string content, uint256 timestamp);
  event CommentDeleted(uint256 tweetId, uint256 commentId, address author, uint256 timestamp);
  event TweetDeleted(uint256 tweetId);

  modifier validTweetLength(string memory _tweet) {
    require(bytes(_tweet).length >= MIN_TWEET_LENGTH, "Tweet cannot be empty");
    require(bytes(_tweet).length <= MAX_TWEET_LENGTH, "Tweet cannot exceed 280 characters");
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  function setUserName(string calldata _name) external {
    // Check if user already has a username
    require(bytes(userNames[msg.sender]).length == 0, "User name already set");
    
    // Convert name to hash and check uniqueness
    bytes32 nameHash = keccak256(bytes(_name));
    require(!isUsernameTaken[nameHash], "Username already taken");
    
    // Update mappings
    userNames[msg.sender] = _name;
    isUsernameTaken[nameHash] = true;
    
    emit UserNameSet(msg.sender, _name);
  }

  function getUserName(address _user) public view returns (string memory) {
    return userNames[_user];
  }

  function isUsernameAvailable(string calldata _name) external view returns (bool) {
    return !isUsernameTaken[keccak256(bytes(_name))];
  }

  function changeTweetMaxandMinLength(uint16 _maxTweetLength, uint8 _minTweetLength) public onlyOwner {
    MAX_TWEET_LENGTH = _maxTweetLength;
    MIN_TWEET_LENGTH = _minTweetLength;
  }

  function createTweet(string memory _tweet) public validTweetLength(_tweet) {
    uint256 currentTweetId = tweetCounter;
    tweets[currentTweetId] = Tweet({
        id: currentTweetId,
        author: msg.sender,
        content: _tweet,
        timestamp: block.timestamp
    });
    tweetIds.push(currentTweetId);
    tweetCounter++;

    emit TweetCreated(currentTweetId, msg.sender, _tweet, block.timestamp);
  }

  function getTweetOfSpecificUser(address _user) public view returns (Tweet[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < tweetIds.length; i++) {
        if (tweets[tweetIds[i]].author == _user) {
            count++;
        }
    }
    Tweet[] memory userTweets = new Tweet[](count);
    uint256 index = 0;
    for (uint256 i = 0; i < tweetIds.length; i++) {
        if (tweets[tweetIds[i]].author == _user) {
            userTweets[index] = tweets[tweetIds[i]];
            index++;
        }
    }
    return userTweets;
  }

  function getPaginatedTweetIds(uint256 page, uint256 pageSize) public view returns (uint256[] memory) {
    uint256 totalTweets = tweetIds.length;
    if (totalTweets == 0) return new uint256[](0);

    // Adjust 'page' so that the first page starts from 1 (not 0)
    uint256 start = (page - 1) * pageSize;

    // If the start index exceeds the total tweet count, return empty array
    if (start >= totalTweets) return new uint256[](0);

    uint256 end = start + pageSize;
    
    // Make sure the 'end' doesn't go beyond the available tweets
    if (end > totalTweets) {
        end = totalTweets;
    }

    // Calculate the actual number of tweets to return
    uint256 count = end - start;

    // Allocate memory for the paginated IDs array
    uint256[] memory paginatedIds = new uint256[](count);

    // Copy the tweet IDs from the correct indices
    for (uint256 i = 0; i < count; i++) {
        paginatedIds[i] = tweetIds[start + i];
    }

    return paginatedIds;
  }

  function getTweetDetails(uint256 _tweetId)
      public
      view
      returns (
          uint256,
          address,
          string memory,
          string memory,
          uint256,
          uint256,
          uint256
      )
  {
    require(_tweetId > 0 && _tweetId < tweetCounter, "Tweet not found");
    Tweet memory tweet = tweets[_tweetId];
    string memory authorName = userNames[tweet.author];
    uint256 likesCount = tweetLikes[_tweetId].length;
    uint256 commentsCount = tweetComments[_tweetId].length;
    return (tweet.id, tweet.author, authorName, tweet.content, tweet.timestamp, likesCount, commentsCount);
  }

  function getTweetLikes(uint256 _tweetId)
      public
      view
      returns (
          uint256[] memory,
          address[] memory,
          uint256[] memory
      )
  {
    require(_tweetId > 0 && _tweetId < tweetCounter, "Tweet not found");
    uint256 likeCount = tweetLikes[_tweetId].length;
    uint256[] memory ids = new uint256[](likeCount);
    address[] memory authors = new address[](likeCount);
    uint256[] memory timestamps = new uint256[](likeCount);

    for (uint256 i = 0; i < likeCount; i++) {
        Like memory likeItem = tweetLikes[_tweetId][i];
        ids[i] = likeItem.id;
        authors[i] = likeItem.author;
        timestamps[i] = likeItem.timestamp;
    }

    return (ids, authors, timestamps);
  }

  function getRandomCommentIds(uint256 _tweetId, uint256 count) public view returns (uint256[] memory) {
    require(_tweetId > 0 && _tweetId < tweetCounter, "Tweet not found");
    uint256 totalComments = tweetComments[_tweetId].length;
    if (totalComments == 0) return new uint256[](0);
    if (count > totalComments) count = totalComments;

    uint256[] memory ids = new uint256[](totalComments);
    for (uint256 i = 0; i < totalComments; i++) {
        ids[i] = tweetComments[_tweetId][i].id;
    }
    // Fisher-Yates shuffle.
    for (uint256 i = totalComments - 1; i > 0; i--) {
        uint256 j = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, i))) % (i + 1);
        (ids[i], ids[j]) = (ids[j], ids[i]);
    }
    uint256[] memory selectedIds = new uint256[](count);
    for (uint256 i = 0; i < count; i++) {
        selectedIds[i] = ids[i];
    }
    return selectedIds;
  }

  function getCommentDetails(uint256 _commentId) public view returns (uint256, address, string memory, uint256) {
      require(_commentId > 0 && _commentId < commentCounter, "Comment not found");
      uint256 tweetIdOfComment = commentToTweet[_commentId];
      uint256 index = commentIndex[_commentId];
      Comment memory comment = tweetComments[tweetIdOfComment][index];
      return (comment.id, comment.author, comment.content, comment.timestamp);
  }

  function likeTweet(uint256 _tweetId) external {
    require(_tweetId > 0 && _tweetId < tweetCounter, "Tweet does not exist");
    require(!tweetLikedBy[_tweetId][msg.sender], "User has already liked this tweet");

    uint256 currentLikeId = likeCounter;
    tweetLikes[_tweetId].push(Like({
        id: currentLikeId,
        author: msg.sender,
        timestamp: block.timestamp
    }));
    // Save the index of the like.
    tweetLikeIndex[_tweetId][msg.sender] = tweetLikes[_tweetId].length - 1;
    tweetLikedBy[_tweetId][msg.sender] = true;
    likeCounter++;

    emit TweetLiked(_tweetId, msg.sender, block.timestamp);
  }

  function unlikeTweet(uint256 _tweetId) external {
    require(_tweetId > 0 && _tweetId < tweetCounter, "Tweet does not exist");
    require(tweetLikedBy[_tweetId][msg.sender], "User hasn't liked this tweet");

    uint256 index = tweetLikeIndex[_tweetId][msg.sender];
    uint256 lastIndex = tweetLikes[_tweetId].length - 1;
    if (index != lastIndex) {
        Like memory lastLike = tweetLikes[_tweetId][lastIndex];
        tweetLikes[_tweetId][index] = lastLike;
        tweetLikeIndex[_tweetId][lastLike.author] = index;
    }
    tweetLikes[_tweetId].pop();
    tweetLikedBy[_tweetId][msg.sender] = false;
    delete tweetLikeIndex[_tweetId][msg.sender];

    emit TweetUnliked(_tweetId, msg.sender, block.timestamp);
  }

  function commentOnTweet(uint256 _tweetId, string memory _comment) external {
    require(_tweetId > 0 && _tweetId < tweetCounter, "Tweet does not exist");

    uint256 currentCommentId = commentCounter;
    tweetComments[_tweetId].push(Comment({
        id: currentCommentId,
        author: msg.sender,
        content: _comment,
        timestamp: block.timestamp
    }));
    // Save lookup info for the comment.
    commentToTweet[currentCommentId] = _tweetId;
    commentIndex[currentCommentId] = tweetComments[_tweetId].length - 1;
    commentCounter++;

    emit CommentCreated(_tweetId, currentCommentId, msg.sender, _comment, block.timestamp);
  }

  function deleteComment(uint256 _commentId) external {
    require(_commentId > 0 && _commentId < commentCounter, "Comment does not exist");
    uint256 tweetIdOfComment = commentToTweet[_commentId];
    uint256 index = commentIndex[_commentId];
    require(tweetComments[tweetIdOfComment][index].author == msg.sender, "Not the comment owner");

    uint256 lastIndex = tweetComments[tweetIdOfComment].length - 1;
    if (index != lastIndex) {
        Comment memory lastComment = tweetComments[tweetIdOfComment][lastIndex];
        tweetComments[tweetIdOfComment][index] = lastComment;
        commentIndex[lastComment.id] = index;
    }
    tweetComments[tweetIdOfComment].pop();
    // Clean up lookup mappings.
    delete commentToTweet[_commentId];
    delete commentIndex[_commentId];

    emit CommentDeleted(tweetIdOfComment, _commentId, msg.sender, block.timestamp);
  }

  function deleteTweet(uint256 _tweetId) public {
    require(_tweetId > 0 && _tweetId < tweetCounter, "Tweet does not exist");
    require(tweets[_tweetId].author == msg.sender, "You can't delete this tweet");

    // Optional: Clean up associated likes and comments.
    delete tweetLikes[_tweetId];
    delete tweetComments[_tweetId];

    // Remove the tweet from the tweets mapping.
    delete tweets[_tweetId];

    // Remove _tweetId from tweetIds array via swap-pop.
    uint256 length = tweetIds.length;
    for (uint256 i = 0; i < length; i++) {
        if (tweetIds[i] == _tweetId) {
            tweetIds[i] = tweetIds[length - 1];
            tweetIds.pop();
            break;
        }
    }

    emit TweetDeleted(_tweetId);
  }
}