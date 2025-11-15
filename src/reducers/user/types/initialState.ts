export type postsType = {
  _id: number;
  uploadDate: string;
  login: string;
  username: string;
  title: string;
  likes: number;
};

type followType = {
  username: string;
  login: string;
  bio: string;
};

export interface IUser {
  username: string;
  login: string;
  email: string;
  postsEqual: number;
  joinDate: string;
  date: string;
  biography: string;
  followers: followType[];
  followersEqual: number;
  following: followType[];
  followingEqual: number;
  posts: postsType[];
}
