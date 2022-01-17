import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";

type Props = {
  confirmationState: boolean;
  setConfirmationState: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

const ResumeModal: React.VFC<Props> = (props) => {
  const { confirmationState, setConfirmationState, onClick } = props;
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={confirmationState}
      onClose={() => setConfirmationState(false)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          margin: 3,
          padding: 3,
        }}
      >
        <Typography variant="h5" component="h5">
          前回保存した状態から再開しますか?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50%",
            margin: 3,
            padding: 3,
          }}
        >
          <Button size="small" variant="contained" color="primary" onClick={onClick}>
            はい
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              localStorage.removeItem("Oekaki App");
              setConfirmationState(false);
            }}
          >
            いいえ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResumeModal;
