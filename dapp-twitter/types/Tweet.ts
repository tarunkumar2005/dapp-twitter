export interface Like {
  id: bigint;
  author: string;
  timestamp: bigint;
}

export interface Comment {
  id: bigint;
  author: string;
  content: string;
  timestamp: bigint;
}

export interface Tweet {
  id: string;
  author: string;
  authorName: string;
  content: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  likedBy: string[];
}