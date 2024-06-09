import { css } from '@emotion/react';
import { DynamicIsland, DynamicIslandMode } from '@kangju2000/dynamic-island';
import { useState } from 'react';
import { MusicPlayer } from '../components/MusicPlayer';
import { PhoneCall } from '../components/PhoneCall';

export function Home() {
  const [mode, setMode] = useState<DynamicIslandMode>(DynamicIslandMode.default);

  const buttonText: Record<DynamicIslandMode, string> = {
    [DynamicIslandMode.default]: 'Default',
    [DynamicIslandMode.custom]: 'Phone Call',
    [DynamicIslandMode.expanded]: 'Music Player',
    [DynamicIslandMode.minimal]: '', // TODO: Add minimal preset
    [DynamicIslandMode.compact]: '', // TODO: Add compact preset
  };

  return (
    <div css={containerCss}>
      <DynamicIsland
        variant={mode}
        expanded={<MusicPlayer />}
        compact={<DynamicIsland.Compact leading={'leading'} trailing={'trailing'} />}
        custom={<PhoneCall />}
      />

      <h1>Dynamic Island</h1>

      <div style={{ display: 'flex', gap: '20px', textAlign: 'center' }}>
        {Object.values(DynamicIslandMode).map((v, index) => {
          if (buttonText[v] === '') {
            return null;
          }

          return (
            <button
              key={index}
              onClick={() => setMode(v)}
              css={buttonCss}
              style={{ backgroundColor: v === mode ? '#333' : 'black' }}
            >
              {buttonText[v]}
            </button>
          );
        })}
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
