export type ToolType = "pen" | "eraser" | "dropper";

export type LineType = {
  tool: ToolType;
  points: number[];
  color: string;
  width: number;
};
