import { css } from '@emotion/react';
import { DynamicIsland, DynamicIslandMode } from '@kangju2000/dynamic-island';
import { useState } from 'react';
import { MusicPlayer } from '../components/MusicPlayer';
import { PhoneCall } from '../components/PhoneCall';

export function Home() {
  const [mode, setMode] = useState<DynamicIslandMode>(DynamicIslandMode.default);

  return (
    <div css={containerCss}>
      <DynamicIsland
        variant={mode}
        expanded={<MusicPlayer />}
        minimal={<DynamicIsland.Minimal>minimal</DynamicIsland.Minimal>}
        compact={<DynamicIsland.Compact leading={'leading'} trailing={'trailing'} />}
        custom={<PhoneCall />}
      />

      <h1>Dynamic Island</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', border: '1px solid #333' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
          <h3>Preset</h3>
          <button
            onClick={() => setMode(DynamicIslandMode.custom)}
            css={buttonCss}
            style={{
              backgroundColor: mode === DynamicIslandMode.custom ? '#333' : 'black',
            }}
          >
            Phone Call
          </button>
          <button
            onClick={() => setMode(DynamicIslandMode.expanded)}
            css={buttonCss}
            style={{ backgroundColor: mode === DynamicIslandMode.expanded ? '#333' : 'black' }}
          >
            Music Player
          </button>
        </div>
        <div style={{ height: '1px', backgroundColor: '#333' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
          <h3>Dynamic Island Mode</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignContent: 'center' }}>
            {Object.values(DynamicIslandMode).map((v, index) => {
              if (v === DynamicIslandMode.custom || v === DynamicIslandMode.minimal) {
                return null;
              }

              return (
                <button
                  key={index}
                  onClick={() => setMode(v)}
                  css={buttonCss}
                  style={{ backgroundColor: v === mode ? '#333' : 'black' }}
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

const buttonCss = css({
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  background: 'black',
  color: 'white',
  cursor: 'pointer',
});
