import { css } from '@emotion/react';
import { DynamicIsland, DynamicIslandMode } from '@kangju2000/dynamic-island';
import { useState } from 'react';
import { CompactMusicPlayer, MusicPlayer } from '../components/MusicPlayer';
import { musicList } from '../components/MusicPlayer/const';
import { MusicStatus } from '../components/MusicPlayer/types';
import { PhoneCall } from '../components/PhoneCall';

export function Home() {
  const [mode, setMode] = useState<DynamicIslandMode>(DynamicIslandMode.default);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicStatus, setMusicStatus] = useState<MusicStatus>('paused');
  const [time, setTime] = useState(0);

  return (
    <div css={containerCss}>
      <DynamicIsland
        variant={mode}
        expanded={
          <MusicPlayer
            music={musicList[musicIndex]}
            status={musicStatus}
            time={time}
            onTimeChange={setTime}
            onMusicChange={state => {
              setMusicStatus(state);

              if (state === 'next') {
                setMusicIndex((musicIndex + 1) % musicList.length);
              } else if (state === 'previous') {
                setMusicIndex((musicIndex - 1 + musicList.length) % musicList.length);
              }
            }}
          />
        }
        compact={<CompactMusicPlayer music={musicList[musicIndex]} state={musicStatus} />}
        custom={<PhoneCall />}
      />

      <h1>Dynamic Island</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <Button onClick={() => setMode(DynamicIslandMode.default)} isActive={mode === DynamicIslandMode.default}>
          Default
        </Button>
        <Button onClick={() => setMode(DynamicIslandMode.custom)} isActive={mode === DynamicIslandMode.custom}>
          Phone Call
        </Button>
        <Button onClick={() => setMode(DynamicIslandMode.expanded)} isActive={mode === DynamicIslandMode.expanded}>
          Music Player
        </Button>
        <Button onClick={() => setMode(DynamicIslandMode.compact)} isActive={mode === DynamicIslandMode.compact}>
          Compact Music Player
        </Button>
      </div>
    </div>
  );
}

const Button = ({
  children,
  onClick,
  isActive,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <button onClick={onClick} css={buttonCss} style={{ backgroundColor: isActive ? '#333' : 'black' }}>
      {children}
    </button>
  );
};

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
