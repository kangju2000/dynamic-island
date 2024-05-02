import { createContext, useContext } from 'react';

type DynamicIslandContextValue = {
  variant: string;
};

export const DynamicIslandContext = createContext<DynamicIslandContextValue | null>(null);

export const useDynamicIslandContext = () => {
  const context = useContext(DynamicIslandContext);

  if (!context) {
    throw new Error('useDynamicIslandContext must be used within a DynamicIslandProvider');
  }
  return context;
};

export const DynamicIslandProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DynamicIslandContextValue;
}) => {
  return <DynamicIslandContext.Provider value={value}>{children}</DynamicIslandContext.Provider>;
};
