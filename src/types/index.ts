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

export type ImageData = {
  id: string;
  image_url: string;
  sub: string;
};

export type CommentData = {
  id: string;
  comment: string;
  paint_id: string;
  sub: string;
};
