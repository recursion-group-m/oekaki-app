import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import theme from "../styles";

const UserList = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    sx={{
      height: { xs: "90%", sm: "100%" },
      width: "90%",
      borderRadius: "1rem",
      boxShadow: 3,
    }}
  >
    <Box sx={{ p: 1 }}>プレイヤー</Box>
    <Box
      sx={{
        height: "100%",
        width: "90%",
        borderRadius: "1rem",
        pb: 1,
      }}
    >
      <List
        sx={{
          height: "100%",
          borderRadius: "1rem",
          bgcolor: theme.palette.success.main,
          position: "relative",
          overflow: "auto",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ color: "white" }}>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ホスト" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ color: "white" }}>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" />
        </ListItem>
      </List>
    </Box>
  </Box>
);

export default UserList;
