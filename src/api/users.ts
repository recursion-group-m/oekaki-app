import Config from "../configs";

export const GetUserId = async (sub: string, userName: string): Promise<Response> => {
  const res = await fetch(`${Config.djangoUrl}/users/${sub}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response);

  if (!res.ok) {
    // eslint-disable-next-line no-console
    PostUserId(sub, userName).catch((e) => console.log(e));
  }
  return res;
};

export const PostUserId = async (sub: string, userName: string): Promise<Response> => {
  const res = await fetch(`${Config.djangoUrl}/users/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
            "sub": "${sub}",
            "user_name": "${userName}"
        }`,
  }).then((response) => response);
  return res;
};
