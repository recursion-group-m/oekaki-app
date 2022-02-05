export type ToolType = "pen" | "eraser" | "dropper";

export type LineType = {
  tool: ToolType;
  points: number[];
  color: string;
  width: number;
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
  sub: {
    sub: string;
    user_name: string;
  };
};
