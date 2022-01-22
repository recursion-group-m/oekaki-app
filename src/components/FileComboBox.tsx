import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Konva from "konva";
import moment from "moment";
import React, { useState } from "react";
import { LineType } from "../types";

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
  lines: LineType[];
};

const FileComboBox: React.VFC<Props> = (props) => {
  const { stageRef, lines } = props;
  const [comboState, setComboState] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setComboState(event.target.value.toString());
    switch (event.target.value.toString()) {
      case "1": {
        const url = stageRef.current?.toDataURL();
        if (url !== undefined) {
          const a = document.createElement("a");
          a.href = url;
          a.download = `image_${moment().format("YYYYMMDDhhmmss")}.png`;
          a.click();
          setComboState("");
        }
        break;
      }
      case "2":
        localStorage.setItem("Oekaki App", JSON.stringify(lines));
        setComboState("");
        break;
      default:
    }
  };
  return (
    <FormControl style={{ width: 150 }}>
      <InputLabel>File</InputLabel>
      <Select value={comboState} onChange={(event: SelectChangeEvent) => handleChange(event)}>
        <MenuItem value={1}>画像に出力</MenuItem>
        <MenuItem value={2}>ペイントを保存</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FileComboBox;
