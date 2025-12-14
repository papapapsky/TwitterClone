import type { postsType } from "../../../../../reducers/user/types/initialState";

export interface IaddPost {
  login: string;
  Post: postsType;
  success: boolean;
}
