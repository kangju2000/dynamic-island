import { css } from '@emotion/react';
import { DynamicIsland, DynamicIslandVariant } from '@kangju2000/dynamic-island';
import { useState } from 'react';

export function Home() {
  const [variant, setVariant] = useState<DynamicIslandVariant>('default');

  const variants: DynamicIslandVariant[] = ['default', 'large', 'xLarge', 'ultra'];

  return (
    <div css={containerCss}>
      <h1>Dynamic Island</h1>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <DynamicIsland variant={variant} />
      </div>
      <div>
        {variants.map(v => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              background: 'black',
              color: 'white',
              cursor: 'pointer',
              margin: '5px',
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  gap: '20px',
});
