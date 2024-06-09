<div align='center'>
   <h1>Dynamic Island</h1>
   <p>React-based implementation of the iPhone's Dynamic Island feature</p>
</div>

<a aria-label="NPM" href="https://www.npmjs.com/package/@kangju2000/dynamic-island">
  <img alt="NPM Install" src="https://img.shields.io/npm/v/@kangju2000/dynamic-island?logo=npm"/>
</a>

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
