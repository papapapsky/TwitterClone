interface IProps {
  title: string;
  postId: string;
}

interface IResponse {
  success: boolean;
  message: string;
}

export const editPost = async ({ title, postId }: IProps) => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;
    const url = import.meta.env.VITE_APP_API_EDIT_POST;

    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer: ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postTitle: title,
        postId,
      }),
    });
    const response: IResponse = await request.json();
    if (!response.success) {
      console.log(response.message);
    }
  } catch (e) {
    console.log(e);
  }
};
