import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import StarsIcon from "@mui/icons-material/Stars";
import PersonIcon from "@mui/icons-material/Person";
import theme from "../styles";
import UserAccount from "./UserAccount";

type Props = {
  userAccountList: { id: number; userName: string }[];
};

const UserList: React.VFC<Props> = ({ userAccountList }) => (
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
    <Box
      sx={{
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
      }}
    >
      プレイヤーリスト
    </Box>
    <Box
      sx={{
        height: "90%",
        width: "90%",
        pb: 1,
      }}
    >
      <List
        sx={{
          height: "100%",
          position: "relative",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.success.main,
            m: 1,
            p: 1,
            borderRadius: "1rem",
            boxShadow: 3,
          }}
        >
          <ListItem
            secondaryAction={
              <IconButton edge="end" disabled>
                <StarsIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ color: "white" }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="ホスト" />
          </ListItem>
        </Box>
        {userAccountList.map((user) => (
          <UserAccount userName={user.userName} />
        ))}
      </List>
    </Box>
  </Box>
);

export default UserList;
