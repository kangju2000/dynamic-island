export type DynamicIslandProps = {
  children?: React.ReactNode;
};

export function DynamicIsland({ children }: DynamicIslandProps) {
  return (
    <div>
      <p>Dynamic Island</p>
      {children}
    </div>
  );
}
