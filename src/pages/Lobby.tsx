import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import theme from "../styles";
import UserList from "../components/UserList";
import InviteButton from "../components/InviteButton";
import PostRoomId from "../api/rooms";
import { GetUserId } from "../api/users";
import Config from "../configs";

type Props = {
  client: W3CWebSocket | undefined;
  setClient: React.Dispatch<React.SetStateAction<W3CWebSocket | undefined>>;
};

const Lobby: React.VFC<Props> = (props) => {
  const url = "oekaki-app/lobby";
  const { client, setClient } = props;
  const [roomId, setRoomId] = useState<string>("");
  // subは
  // const { user } = useAuth0;
  // で置換予定
  const sub = "test1111111111";

  useEffect(() => {
    const getRoomId = async () => {
      // eslint-disable-next-line no-console
      console.log(`User: ${sub}`);
      // eslint-disable-next-line no-console
      GetUserId(sub).catch((e) => console.log(e));
      const postResponse = await PostRoomId(sub);
      setRoomId(postResponse.room_id);
    };
    // eslint-disable-next-line no-console
    getRoomId().catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (roomId !== "") {
      // eslint-disable-next-line no-console
      console.log(`roomId: ${roomId}`);
      setClient(new W3CWebSocket(`${Config.djangoWsUrl}/${roomId}`));
      if (client !== undefined) {
        client.onopen = () => {
          // eslint-disable-next-line no-console
          console.log("WebSocket Client Connected");
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const userAccountList = [
    { id: 1, userName: "ゲスト1" },
    { id: 2, userName: "ゲスト2" },
    { id: 3, userName: "ゲスト3" },
    { id: 4, userName: "ゲスト4" },
    { id: 5, userName: "ゲスト5" },
    { id: 6, userName: "ゲスト6" },
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        component="main"
        display="flex"
        sx={{
          alignItems: { sm: "center" },
          height: "100vh",
          p: 3,
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: { xs: "80%", sm: "100%" },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                pb: 2,
                display: { xs: "block", sm: "none" },
              }}
            >
              <Typography variant="h5">Oekaki App</Typography>
            </Box>
            <UserList userAccountList={userAccountList} />
          </Box>
        </Grid>
        <Grid
          item
          sm={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            height: { xs: "20%", sm: "100%" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              pb: 5,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Typography variant="h3">Oekaki App</Typography>
          </Box>
          <Box display="flex">
            <Box sx={{ pr: 1 }}>
              <InviteButton url={url} />
            </Box>
            <Link to="/main" style={{ textDecoration: "none" }}>
              <Box sx={{ pl: 1 }}>
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
                >
                  スタート
                </Button>
              </Box>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Lobby;
