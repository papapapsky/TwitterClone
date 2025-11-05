export interface response {
  token: string;
  message: string;
  success: boolean;
}

export interface responseWithToken extends response {
  decode: {
    username: string;
    password: string;
  };
}
