const info = {
  djangoUrl: process.env.REACT_APP_DJANGO_URL || "localhost",
};

export const GetUserId = async (sub: string): Promise<Response> => {
  const res = await fetch(`${info.djangoUrl}/users/${sub}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response);

  if (!res.ok) {
    // eslint-disable-next-line no-console
    PostUserId(sub).catch((e) => console.log(e));
  }
  return res;
};

export const PostUserId = async (sub: string): Promise<Response> => {
  const res = await fetch(`${info.djangoUrl}/users/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
            "sub": "${sub}"
        }`,
  }).then((response) => response);
  return res;
};
