import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CorrectButton from "./CorrectButton";

import theme from "../styles";

type Props = {
  initialLetter: string;
  text: string;
};

const CommentLeft: React.VFC<Props> = (props) => {
  const { initialLetter, text } = props;
  return (
    <Stack direction="row" sx={{ width: "100%", py: 2 }}>
      <Avatar>{initialLetter}</Avatar>
      <Stack direction="row" sx={{ width: "100%", pl: 1, alignItems: "center" }}>
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
        <CorrectButton />
      </Stack>
    </Stack>
  );
};

export default CommentLeft;
