export type DynamicIslandVariant = keyof typeof DynamicIslandMode;

export enum DynamicIslandMode {
  "default" = "default",
  "compact" = "compact",
  "minimal" = "minimal",
  "expanded" = "expanded",
}
