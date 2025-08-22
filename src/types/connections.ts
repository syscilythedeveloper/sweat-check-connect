export enum connectionType {
  following = "following",
  followed_by = "followed_by",
  not_connected = "not_connected",
}

export interface ConnectionCardProps {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  userFollows?: boolean;
}

export enum FollowStatus {
  requested = "REQUESTED",
  accepted = "ACCEPTED",
  not_following = "NOT_FOLLOWING",
}
