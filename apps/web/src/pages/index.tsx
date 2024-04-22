import { css } from '@emotion/react';
import { DynamicIsland, DynamicIslandVariant } from '@kangju2000/dynamic-island';
import { useState } from 'react';

export function Home() {
  const [variant, setVariant] = useState<DynamicIslandVariant>('default');
  const [position, setPosition] = useState<'default' | 'fixed'>('fixed');

  const variants: DynamicIslandVariant[] = ['default', 'compact', 'minimal', 'half', 'extended'];

  return (
    <div css={containerCss}>
      <h1>Dynamic Island</h1>
      <div css={position === 'fixed' ? fixedDynamicIslandCss : undefined}>
        <DynamicIsland variant={variant} />
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
        }}
      >
        <button
          onClick={() => setPosition(position === 'default' ? 'fixed' : 'default')}
          css={buttonCss}
          style={{ gridColumn: `span ${variants.length}` }}
        >
          {position === 'default' ? 'Fixed' : 'Default'}
        </button>

        {variants.map(v => (
          <button
            key={v}
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
