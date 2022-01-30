import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CommentLeft from "./CommentLeft";

import theme from "../styles";
import { MessageType } from "../types";

type Props = {
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  handleTextMessage: () => void;
  messages: MessageType[];
};

const RightContainer: React.VFC<Props> = (props) => {
  const { messageText, setMessageText, handleTextMessage, messages } = props;
  // subは
  // const { user } = useAuth0;
  // で置換予定
  const sub = "test1111111112";

  return (
    <Grid sm={3} sx={{ pt: 2 }} item>
      <Stack sx={{ height: "100%", px: 2, pr: { sm: 5 } }}>
        <Box>
          <Typography variant="h3" color={theme.palette.secondary.main}>
            ??????
          </Typography>
        </Box>
        <Box
          sx={{
            height: { xs: "300px", sm: "65%" },
            overflow: "scroll",
            bgcolor: "white",
            mt: "2rem",
            display: "flex",
            flexDirection: "column",
            p: "1rem",
            borderRadius: 5,
            boxShadow: 3,
          }}
        >
          {messages
            .filter((message) => message.name !== sub)
            .map((message) => (
              <CommentLeft initialLetter={message.name.substring(0, 1)} text={message.text} />
            ))}
        </Box>
        <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
          <Stack direction="row">
            <FormControl>
              <InputLabel>ひらがな６文字</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={messageText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMessageText(event.target.value)}
              />
              <FormHelperText id="my-helper-text">答えを投稿しましょう</FormHelperText>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
              <Button
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: "white",
                  "&:hover": { color: theme.palette.secondary.dark },
                }}
                variant="outlined"
                startIcon={<SendIcon />}
                onClick={handleTextMessage}
              >
                Send
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Grid>
  );
};

export default RightContainer;
