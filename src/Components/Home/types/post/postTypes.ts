import type { postsType } from "../../../../reducers/user/types/initialState";

export interface IaddPost {
  message: string;
  success: boolean;
  Post: postsType;
}
