export type postsType = {
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

export interface IinitialState {
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
