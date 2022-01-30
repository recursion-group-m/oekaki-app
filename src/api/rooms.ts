import Config from "../configs";

type roomData = {
  room_id: string;
  posted_by: string;
};

const PostRoomId = async (sub: string): Promise<roomData> => {
  const res = await fetch(`${Config.djangoUrl}/rooms/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
            "posted_by": "${sub}"
        }`,
  }).then((response) => response);
  return res.json() as Promise<roomData>;
};

export default PostRoomId;
