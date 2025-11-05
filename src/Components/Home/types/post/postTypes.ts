type postType = {
  likes: number;
  title: string;
  login: string;
  username: string;
};

export interface IaddPost {
  message: string;
  success: boolean;
  Post: postType;
}
