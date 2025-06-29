// src/types/post.ts
export interface Post {
  id: number;
  title: string;
  type: string;
  user: {
    username: string;
    profilePhoto: string;
  };
  timestamp: string;
  image: string;
  focus: string;
  caption: string;
  location: string;
  likes: number;
  comments: number;
  liked: boolean;
}
