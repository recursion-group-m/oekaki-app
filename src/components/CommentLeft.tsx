import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
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
      <Box sx={{ width: "100%", pt: 2, pl: 2, display: "flex" }}>
        <Box
          sx={{
            maxWidth: "70%",
            borderRadius: 16,
            bgcolor: theme.palette.background.default,
            textAlign: "start",
            py: 2,
            px: 3,
            display: "flex",
            alignItems: "center",
            wordBreak: "break-all",
          }}
        >
          {text}
        </Box>
      </Box>
    </Stack>
  );
};

export default CommentLeft;
