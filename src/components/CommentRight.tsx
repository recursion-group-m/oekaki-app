import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import theme from "../styles";

const CommentRight = () => (
  <Stack direction="row" sx={{ width: "100%", py: 2 }}>
    <Box sx={{ width: "100%", pt: 2, pl: 2, display: "flex", justifyContent: "end" }}>
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
        test
      </Box>
    </Box>
  </Stack>
);

export default CommentRight;
