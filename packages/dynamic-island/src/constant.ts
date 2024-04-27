import { type FigmaSquircleParams } from "figma-squircle";
import { type DynamicIslandVariant } from "./types";

export const sizeMap: Record<DynamicIslandVariant, FigmaSquircleParams> = {
  default: {
    width: 122,
    height: 36.67,
    cornerRadius: 32,
    cornerSmoothing: 0.6,
  },
  compact: {
    width: 227,
    height: 36.67,
    cornerRadius: 32,
    cornerSmoothing: 0.6,
  },
  minimal: {
    width: 155,
    height: 36.67,
    cornerRadius: 32,
    cornerSmoothing: 0.6,
  },
  // half: { width: 366, height: 82, cornerRadius: 50, cornerSmoothing: 0 },
  expanded: { width: 366, height: 200, cornerRadius: 48, cornerSmoothing: 0.6 },
};
