<div align='center'>
   <h1>Dynamic Island</h1>
   <p>React-based implementation of the iPhone's Dynamic Island feature</p>
</div>

> [!NOTE]
> This project is still in development and may not be stable.

[Live Demo](https://dynamic-island-web.vercel.app/)

## Install

```bash
npm install @kangju2000/dynamic-island
```

## example

```tsx
import React from 'react';
import { DynamicIsland, DynamicIslandMode } from '@kangju2000/dynamic-island';

function App() {
  const [mode, setMode] = React.useState<DynamicIslandMode>(DynamicIslandMode.default);

  return (
    <DynamicIsland
      variant={mode}
      expanded={<DynamicIsland.Expanded>{/** expanded content */}</DynamicIsland.Expanded>}
      compact={<DynamicIsland.Compact leading={/** leading content */} trailing={/** trailing content */} />}
      custom={<DynamicIsland.Custom>{/** custom content */}</DynamicIsland.Custom>}
    />
  );
}
```
