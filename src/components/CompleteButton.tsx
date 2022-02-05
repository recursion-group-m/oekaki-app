import React, { useState } from "react";
import Konva from "konva";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from "react-share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import theme from "../styles";
import { PostPaintData } from "../api/paints";

type Props = {
  url: string;
  stageRef: React.RefObject<Konva.Stage>;
};

const CompleteButton: React.VFC<Props> = ({ url, stageRef }) => {
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const { user } = useAuth0();

  const handleClickOpen = () => {
    const imageUrl = stageRef.current?.toDataURL();
    if (user !== undefined && user.sub !== undefined && imageUrl !== undefined) {
      PostPaintData(user.sub, imageUrl)
        .then((data) => {
          setImageId(data.id);
        })
        .catch((e) => console.log(e));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        size="large"
        endIcon={<LibraryAddCheckIcon />}
        sx={{
          background: theme.palette.secondary.main,
          "&:hover": {
            background: theme.palette.secondary.dark,
          },
        }}
      >
        完成！
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>共有</DialogTitle>
          <DialogActions>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Box>
        <DialogContent>
          <DialogContentText>下のURLをコピー、共有して、書いた絵をみんなに見てもらおう！</DialogContentText>
          <Box sx={{ pt: 4 }}>
            <CopyToClipboard text={`${url}/${imageId}`}>
              <IconButton size="small">
                <ContentCopyIcon />
              </IconButton>
            </CopyToClipboard>
            <SyntaxHighlighter>{`${url}/${imageId}`}</SyntaxHighlighter>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Box sx={{ pr: 1 }}>
              <TwitterShareButton
                url={`${url}/${imageId}`}
                title="絵を描いたから、見てみてね！"
                hashtags={["oekakiapp"]}
              >
                <TwitterIcon size={30} round />
              </TwitterShareButton>
            </Box>
            <LineShareButton url={`${url}/${imageId}`} title="絵を描いたから、見てみてね！">
              <LineIcon size={30} round />
            </LineShareButton>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompleteButton;
