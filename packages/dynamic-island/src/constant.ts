import { type DynamicIslandVariant, Squircle } from './types';

export const squircleVariant: Record<DynamicIslandVariant, Squircle> = {
  default: { width: 122, height: 36.67, cornerRadius: 32, cornerSmoothing: 0.6 },
  compact: { width: 227, height: 36.67, cornerRadius: 32, cornerSmoothing: 0.6 },
  minimal: { width: 45, height: 36.67, cornerRadius: 32, cornerSmoothing: 0.6 },
  expanded: { width: 366, height: 200, cornerRadius: 48, cornerSmoothing: 0.6 },
  custom: { width: 122, height: 36.67, cornerRadius: 32, cornerSmoothing: 0.6 },
};
