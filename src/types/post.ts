// src/types/post.ts
export interface Post {
  id: number;
  title: string;
  type: string;
  mediaType: "image" | "video" | "text";
  user: {
    username: string;
    profilePhoto: string;
  };
  timestamp: string;
  image: string;
  video?: string;
  focus: string;
  caption: string;
  location: string;
  likes: number;
  comments: number;
  liked: boolean;
}
