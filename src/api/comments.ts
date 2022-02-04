import Config from "../configs";
import { CommentData } from "../types";

export const GetComments = async (imageId: string): Promise<CommentData[]> => {
  const res = await fetch(`${Config.djangoUrl}/comments/?paint_id=${imageId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response);

  return res.json() as Promise<CommentData[]>;
};

export const PostComment = async (sub: string, paintId: string, comment: string): Promise<CommentData> => {
  const res = await fetch(`${Config.djangoUrl}/comments/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
            "sub": "${sub}",
            "paint_id": "${paintId}",
            "comment": "${comment}"
        }`,
  }).then((response) => response);
  return res.json() as Promise<CommentData>;
};
