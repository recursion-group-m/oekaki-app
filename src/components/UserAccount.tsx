import React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import theme from "../styles";

type Props = {
  primary: string;
};

const UserAccount: React.VFC<Props> = ({ primary }) => (
  <Box
    sx={{
      bgcolor: theme.palette.success.main,
      m: 1,
      p: 1,
      borderRadius: "1rem",
      boxShadow: 3,
    }}
  >
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ color: "white" }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primary} />
    </ListItem>
  </Box>
);

export default UserAccount;
