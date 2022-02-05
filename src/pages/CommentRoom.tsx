import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";

import theme from "../styles";
import RightContainer from "../components/RightContainer";
import { GetImageData } from "../api/paints";

const CommentRoom = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageCreateData, setImageCreateData] = useState<string>("");
  const { imageId } = useParams();
  const imageIdString = imageId || (localStorage.getItem("imageId") ?? "");
  if (imageId !== undefined) {
    localStorage.setItem("imageId", imageId);
  }

  useEffect(() => {
    if (imageIdString !== "") {
      GetImageData(imageIdString)
        .then((data) => {
          setImageUrl(data.image_url);
          const resultDataStr = fixData(data.created_at);
          setImageCreateData(resultDataStr);
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
    }
  }, [imageIdString]);

  const fixData = (data: string) => {
    const baseData = data;
    const atIndex = baseData.indexOf("T");
    let frontDataStr = baseData.substring(0, atIndex);
    frontDataStr = frontDataStr.replace(/-/g, "/");
    const backDataStr = baseData.substring(atIndex + 1, atIndex + 6);
    return `${frontDataStr} ${backDataStr}`;
  };

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
          <Stack sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "80%", bgcolor: "white", boxShadow: 5 }}>
              <img src={imageUrl} style={{ width: "100%", height: "100%" }} alt="" />
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end", position: "relative", right: "10%" }}>
              <Typography>{imageCreateData}</Typography>
            </Box>
          </Stack>
        </Grid>
        <RightContainer imageId={imageIdString} />
      </Stack>
    </div>
  );
};

export default CommentRoom;
