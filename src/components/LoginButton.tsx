import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import theme from "../styles";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="contained"
      size="large"
      endIcon={<SendIcon />}
      sx={{
        background: theme.palette.secondary.main,
        "&:hover": {
          background: theme.palette.secondary.dark,
        },
      }}
      onClick={() => loginWithRedirect()}
    >
      はじめる！
    </Button>
  );
};

export default LoginButton;
