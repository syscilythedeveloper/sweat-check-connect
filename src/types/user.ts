export interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
}
export enum MembershipType {
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  PRO = "PRO",
}
