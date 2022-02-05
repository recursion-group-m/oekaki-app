import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";

import theme from "../styles";
import RightContainer from "../components/RightContainer";
import { GetImageData } from "../api/paints";

const CommentRoom = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { imageIdParam } = useParams();
  const imageId = imageIdParam || (localStorage.getItem("imageId") ?? "");
  if (imageIdParam !== undefined) {
    localStorage.setItem("imageId", imageId);
  }

  useEffect(() => {
    if (imageId !== "") {
      GetImageData(imageId)
        .then((data) => setImageUrl(data.image_url))
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
    }
  }, [imageId]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          height: { sx: "100%", sm: "100vh" },
          bgcolor: theme.palette.background.default,
        }}
      >
        <Grid sm={9} sx={{ pt: "3rem" }} item>
          <Stack sx={{ display: "flex", alignItems: "center" }}>
            <img src={imageUrl} alt="" />
          </Stack>
        </Grid>
        <RightContainer imageIdParam={imageIdParam} />
      </Stack>
    </div>
  );
};

export default CommentRoom;
