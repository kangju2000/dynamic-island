export type DynamicIslandVariant = keyof typeof DynamicIslandMode;

export enum DynamicIslandMode {
  'default' = 'default',
  'compact' = 'compact',
  'minimal' = 'minimal',
  'expanded' = 'expanded',
  'custom' = 'custom',
}

export type Squircle = {
  width: number;
  height: number;
  cornerRadius: number;
  cornerSmoothing: number;
  preserveSmoothing?: boolean;
};
