import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";

import theme from "../styles";
import LoginButton from "./LoginButton";
import { GetComments, PostComment } from "../api/comments";
import { CommentData } from "../types";
import CommentLeft from "./CommentLeft";

type Props = {
  imageId: string;
};

const RightContainer: React.VFC<Props> = (props) => {
  const { imageId } = props;
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const { user, isAuthenticated } = useAuth0();
  const [shouldGetComments, setShouldGetComments] = useState<boolean>(true);
  // eslint-disable-next-line no-console
  console.log(imageId);
  useEffect(() => {
    if (shouldGetComments && imageId !== "") {
      GetComments(imageId)
        .then((data) => setComments(data))
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
      setShouldGetComments(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGetComments]);

  const handleSendComment = () => {
    if (user !== undefined && user.sub !== undefined) {
      // eslint-disable-next-line no-console
      PostComment(user.sub, imageId, commentText).catch((e) => console.log(e));
      setCommentText("");
      setShouldGetComments(true);
    }
  };

  return (
    <Grid lg={4} sx={{ pt: 2 }} pb={{ sm: 3, lg: 0 }} item>
      <Stack sx={{ height: "100%", px: 2, pr: { sm: 5 } }}>
        <Box
          sx={{
            height: { xs: "400px", lg: "70%" },
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
          {comments.map((commentData) => (
            <CommentLeft initialLetter="T" text={commentData.comment} />
          ))}
        </Box>
        {isAuthenticated ? (
          <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
            <Stack direction="row">
              <FormControl>
                <InputLabel>ステキ♡</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  value={commentText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCommentText(event.target.value)}
                />
                <FormHelperText id="my-helper-text">描いた人にコメントしよう！</FormHelperText>
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
                  onClick={handleSendComment}
                >
                  Send
                </Button>
              </Box>
            </Stack>
          </Box>
        ) : (
          <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
            <Typography>ログインしてコメントを送ろう!</Typography>
            <LoginButton buttonName="コメントする！" url="comment-room" />
          </Box>
        )}
      </Stack>
    </Grid>
  );
};

export default RightContainer;
