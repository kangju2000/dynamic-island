import { css } from '@emotion/react';
import { DynamicIsland, type DynamicIslandVariant, DynamicIslandMode } from '@kangju2000/dynamic-island';
import { useState } from 'react';
import { IconPhoneCircleFill, IconPhoneDownCircleFill } from './../assets/index';

export function Home() {
  const [variant, setVariant] = useState<DynamicIslandVariant>('default');

  return (
    <div css={containerCss}>
      <div css={fixedDynamicIslandCss}>
        <DynamicIsland
          variant={variant}
          expanded={<DynamicIsland.Expanded>expanded</DynamicIsland.Expanded>}
          minimal={<DynamicIsland.Minimal>minimal</DynamicIsland.Minimal>}
          compact={<DynamicIsland.Compact leading={'leading'} trailing={'trailing'} />}
          custom={
            <DynamicIsland.Custom
              squircle={{
                width: 366,
                height: 82,
                cornerRadius: 50,
                cornerSmoothing: 0,
              }}
              style={{
                width: 366,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 14px',
              }}
            >
              <img
                src="https://avatars.githubusercontent.com/u/23312485?v=4"
                alt="profile"
                width={45}
                height={45}
                style={{ borderRadius: '50%' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', color: '#707070' }}>Mobile</p>
                <p style={{ fontSize: '16px' }}>Juhyeok Kang</p>
              </div>
              <IconPhoneDownCircleFill />
              <IconPhoneCircleFill />
            </DynamicIsland.Custom>
          }
        />
      </div>

      <h1>Dynamic Island</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
          <h3>Preset</h3>
          <button
            onClick={() => setVariant('custom')}
            css={buttonCss}
            style={{ backgroundColor: variant === 'custom' ? '#333' : 'black' }}
          >
            Phone Call
          </button>
        </div>
        <div style={{ height: '90%', borderLeft: '1px solid #333' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
          <h3>Dynamic Island Mode</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignContent: 'center' }}>
            {Object.values(DynamicIslandMode).map((v, index) => {
              if (v === 'custom') {
                return null;
              }

              return (
                <button
                  key={index}
                  onClick={() => setVariant(v)}
                  css={buttonCss}
                  style={{ backgroundColor: v === variant ? '#333' : 'black' }}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
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
  gap: '60px',
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
