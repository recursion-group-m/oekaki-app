import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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

type Props = {
  url: string;
};

const InviteButton: React.VFC<Props> = ({ url }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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
        endIcon={<PersonAddAlt1Icon />}
        sx={{
          background: theme.palette.secondary.main,
          "&:hover": {
            background: theme.palette.secondary.dark,
          },
        }}
      >
        招待
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>招待</DialogTitle>
          <DialogActions>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Box>
        <DialogContent>
          <DialogContentText>下のリンクをコピーして共有しよう！</DialogContentText>
          <Box sx={{ pt: 4 }}>
            <CopyToClipboard text={url}>
              <IconButton size="small">
                <ContentCopyIcon />
              </IconButton>
            </CopyToClipboard>
            <SyntaxHighlighter>{url}</SyntaxHighlighter>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Box sx={{ pr: 1 }}>
              <TwitterShareButton url={url} title="みんなで遊ぼう、お絵かきアプリ！" hashtags={["oekakiapp"]}>
                <TwitterIcon size={30} round />
              </TwitterShareButton>
            </Box>
            <LineShareButton url={url} title="みんなで遊ぼう、お絵かきアプリ！">
              <LineIcon size={30} round />
            </LineShareButton>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteButton;
