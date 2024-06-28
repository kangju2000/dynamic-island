export type DynamicIslandVariant = keyof typeof DynamicIslandMode;

export enum DynamicIslandMode {
  'default' = 'default',
  'compact' = 'compact',
  'minimal' = 'minimal',
  'expanded' = 'expanded',
  'custom' = 'custom',
}

export type VariantStyle = {
  width: number;
  height: number;
  borderRadius: number;
};
