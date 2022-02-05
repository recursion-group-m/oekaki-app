import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import theme from "../styles";

type Props = {
  initialLetter: string;
  text: string;
  createdDate: string;
  userName: string;
};

const CommentLeft: React.VFC<Props> = (props) => {
  const { initialLetter, text, createdDate, userName } = props;

  const shapeTheData = (data: string) => {
    const baseData = data;
    const atIndex = baseData.indexOf("T");
    // let frontDataStr = baseData.substring(0, atIndex);
    // frontDataStr = frontDataStr.replace(/-/g, "/");
    const backDataStr = baseData.substring(atIndex + 1, atIndex + 6);
    return backDataStr;
  };

  const resultDataStr = shapeTheData(createdDate);

  return (
    <Stack direction="row" sx={{ width: "100%", py: 2 }}>
      <Avatar>{initialLetter}</Avatar>
      <Stack direction="row" sx={{ width: "100%", pl: 1, alignItems: "end" }}>
        <Box>
          {userName}
          <Box
            sx={{
              maxWidth: "60%",
              borderRadius: 16,
              bgcolor: theme.palette.background.default,
              textAlign: "start",
              py: 1,
              px: 3,
              display: "flex",
              alignItems: "center",
              wordBreak: "break-all",
            }}
          >
            {text}
          </Box>
        </Box>
        <Box sx={{ fontSize: "2px", pb: "5px", pl: "2px" }}>{resultDataStr}</Box>
      </Stack>
    </Stack>
  );
};

export default CommentLeft;
