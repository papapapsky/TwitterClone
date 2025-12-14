type commentsType = {
  username: string;
  login: string;
  title: string;
};

export type postsType = {
  _id: string;
  comments: commentsType;
  uploadDate: string;
  login: string;
  username: string;
  title: string;
  likes: number;
};

export type followType = {
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
