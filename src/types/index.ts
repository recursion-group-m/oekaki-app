export type ToolType = "pen" | "eraser";

export type LineType = {
  tool: ToolType;
  points: number[];
  color: string;
};
