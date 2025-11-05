interface IParameters {
  login: string;
  password: string;
}

export const loginRequest = async ({ login, password }: IParameters) => {
  try {
    const request = await fetch(import.meta.env.VITE_APP_API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    });

    return await request.json();
  } catch (e) {
    console.log(e);
  }
};
