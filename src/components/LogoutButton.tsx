import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import theme from "../styles";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      size="small"
      sx={{ color: theme.palette.secondary.main }}
      onClick={() => {
        logout({ returnTo: window.location.origin });
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
