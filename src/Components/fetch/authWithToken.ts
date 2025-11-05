export const authWithToken = async (url: string, method: string) => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  const request = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await request.json();
};
