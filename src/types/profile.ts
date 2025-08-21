export enum ProfileDisplayType {
  CHECKINS = "checkins",
  FOLLOWERS = "followers",
  FOLLOWING = "following",
}

export interface UserCheckIn {
  id: string;
  checkInDate: string;
  checkInThumbNail: string;
  videoUrl: string;
  caption: string;
}

export interface Connection {
  id: string;
  username: string;
  avatar: string;
}
