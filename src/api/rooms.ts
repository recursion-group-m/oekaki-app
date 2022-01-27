const info = {
  djangoUrl: process.env.REACT_APP_DJANGO_URL || "localhost",
};

type RoomData = {
  room_id: string;
  posted_by: string;
};

const PostRoomId = async (sub: string): Promise<RoomData> => {
  const res = await fetch(`${info.djangoUrl}/rooms/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
            "posted_by": "${sub}"
        }`,
  }).then((response) => response);
  return res.json() as Promise<RoomData>;
};

export default PostRoomId;
