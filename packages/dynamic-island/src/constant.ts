import { type VariantStyle, type DynamicIslandVariant } from './types';

export const variantStyleMap: Record<DynamicIslandVariant, VariantStyle> = {
  default: { width: 122, height: 36.67, borderRadius: 32 },
  compact: { width: 227, height: 36.67, borderRadius: 32 },
  minimal: { width: 45, height: 36.67, borderRadius: 32 },
  expanded: { width: 366, height: 200, borderRadius: 48 },
  custom: { width: 122, height: 36.67, borderRadius: 32 },
};
