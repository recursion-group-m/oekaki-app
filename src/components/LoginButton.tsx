import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import theme from "../styles";

type Props = {
  url: string;
};

const LoginButton: React.VFC<Props> = (props) => {
  const { url } = props;
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
      onClick={() =>
        loginWithRedirect({
          redirectUri: `${window.location.origin}/${url}`,
        })
      }
    >
      はじめる！
    </Button>
  );
};

export default LoginButton;
