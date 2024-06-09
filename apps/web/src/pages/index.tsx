import { css } from '@emotion/react';
import { DynamicIsland, DynamicIslandMode } from '@kangju2000/dynamic-island';
import { useState } from 'react';
import { MusicPlayer } from '../components/MusicPlayer';
import { musicList } from '../components/MusicPlayer/const';
import { PhoneCall } from '../components/PhoneCall';

export function Home() {
  const [mode, setMode] = useState<DynamicIslandMode>(DynamicIslandMode.default);
  const [musicIndex, setMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
        expanded={
          <MusicPlayer
            currentMusic={musicList[musicIndex]}
            isPlaying={isPlaying}
            onNext={() => setMusicIndex((musicIndex + 1) % musicList.length)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onPrev={() => setMusicIndex((musicIndex - 1 + musicList.length) % musicList.length)}
          />
        }
        compact={<DynamicIsland.Compact leading={'leading'} trailing={'trailing'} />}
        custom={<PhoneCall />}
      />

      <h1>Dynamic Island</h1>

      <div style={{ display: 'flex', gap: '20px', textAlign: 'center' }}>
        {Object.values(DynamicIslandMode).map((m, index) => {
          if (buttonText[m] === '') {
            return null;
          }

          return (
            <button
              key={index}
              onClick={() => setMode(m)}
              css={buttonCss}
              style={{ backgroundColor: m === mode ? '#333' : 'black' }}
            >
              {buttonText[m]}
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
