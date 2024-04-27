import { css } from '@emotion/react';
import { DynamicIsland, DynamicIslandVariant, DynamicIslandMode } from '@kangju2000/dynamic-island';
import { useState } from 'react';

export function Home() {
  const [variant, setVariant] = useState<DynamicIslandVariant>('default');
  return (
    <div css={containerCss}>
      <h1>Dynamic Island</h1>
      <div css={fixedDynamicIslandCss}>
        <DynamicIsland
          variant={variant}
          compactLeading={<div>CompactLeading</div>}
          compactTrailing={<div>CompactTrailing</div>}
          expanded={<div>Expanded</div>}
          minimal={<div>Minimal</div>}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {Object.values(DynamicIslandMode).map((v, index) => (
          <button
            key={index}
            onClick={() => setVariant(v)}
            css={buttonCss}
            style={{ backgroundColor: v === variant ? '#333' : 'black' }}
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

const fixedDynamicIslandCss = css({
  position: 'fixed',
  top: '20px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const buttonCss = css({
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  background: 'black',
  color: 'white',
  cursor: 'pointer',
});
