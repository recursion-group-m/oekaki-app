import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Konva from "konva";
import React, { useState } from "react";
import { LineType } from "../types";

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
  lines: LineType[];
};

const FileComboBox: React.VFC<Props> = (props) => {
  const { stageRef } = props;
  const [comboState, setComboState] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setComboState(event.target.value.toString());
    if (event.target.value.toString() === "1") {
      const url = stageRef.current?.toDataURL();
      if (url !== undefined) {
        const a = document.createElement("a");
        a.href = url;
        a.download = "image.png";
        a.click();
        setComboState("");
      }
    }
  };
  return (
    <FormControl style={{ width: 150 }}>
      <InputLabel>File</InputLabel>
      <Select value={comboState} onChange={(event: SelectChangeEvent) => handleChange(event)}>
        <MenuItem value={1}>画像に出力</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FileComboBox;
