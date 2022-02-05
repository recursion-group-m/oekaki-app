import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import theme from "../styles";
import RightContainer from "../components/RightContainer";
import { GetImageData } from "../api/paints";

const CommentRoom = () => {
  const imageId = "97ba1955-863d-4426-b5b9-887d76ed5633";
  const { user } = useAuth0();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    GetImageData(imageId)
      .then((data) => setImageUrl(data.image_url))
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }, [user]);

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
        <RightContainer />
      </Stack>
    </div>
  );
};

export default CommentRoom;
