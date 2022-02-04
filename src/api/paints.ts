import Config from "../configs";
import { ImageData } from "../types";

export const GetImageData = async (imageId: string): Promise<ImageData> => {
  const res = await fetch(`${Config.djangoUrl}/paints/${imageId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response);

  return res.json() as Promise<ImageData>;
};

export const PostPaintData = async (sub: string, url: string): Promise<ImageData> => {
  const res = await fetch(`${Config.djangoUrl}/paints/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
            "sub": "${sub}",
            "image_url": "${url}"
        }`,
  }).then((response) => response);
  return res.json() as Promise<ImageData>;
};
