export enum connectionType {
  following = "following",
  followed_by = "followed_by",
}

export interface ConnectionCardProps {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
}
