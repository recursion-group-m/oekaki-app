import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";

import theme from "../styles";
import RightContainer from "../components/RightContainer";
import { GetImageData } from "../api/paints";

const CommentRoom = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { imageId } = useParams();
  const imageIdString = imageId || (localStorage.getItem("imageId") ?? "");
  if (imageId !== undefined) {
    localStorage.setItem("imageId", imageId);
  }

  useEffect(() => {
    if (imageIdString !== "") {
      GetImageData(imageIdString)
        .then((data) => setImageUrl(data.image_url))
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
    }
  }, [imageIdString]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        sx={{
          // justifyContent: "center",
          alignItems: { xs: "center", lg: "stretch" },
          minHeight: "100vh",
          height: { lg: "100vh" },
          bgcolor: theme.palette.background.default,
        }}
      >
        <Grid lg={8} sx={{ pt: "3rem" }} item>
          <Stack sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ width: "80%", bgcolor: "white", boxShadow: 5 }}>
              <img src={imageUrl} style={{ width: "100%", height: "100%" }} alt="" />
            </Box>
          </Stack>
        </Grid>
        <RightContainer imageId={imageIdString} />
      </Stack>
    </div>
  );
};

export default CommentRoom;
