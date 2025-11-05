type postsType = {
  login: string;
  username: string;
  title: string;
  likes: number;
};

type followType = {
  login: string;
  username: string;
  bio: string;
};

export interface userInfo {
  login: string;
  username: string;
  email: string;
  postsEqual: number;
  date: string;
  joinDate: string;
  biography: string;
  followers: followType[];
  followersEqual: number;
  following: followType[];
  followingEqual: number;
  posts: postsType[];
}
