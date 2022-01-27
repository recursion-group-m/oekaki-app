export type ToolType = "pen" | "eraser" | "dropper";

export type LineType = {
  tool: ToolType;
  points: number[];
  color: string;
  width: number;
};

export type MessageType = {
  text: string;
  name: string;
};

export type DataTypeFromServer = {
  type: string;
  message: string;
  user: string;
};
