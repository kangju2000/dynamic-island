import { css } from '@emotion/react';
import { DynamicIsland } from '@kangju2000/dynamic-island';
import { Equalizer } from './Equalizer';
import { Thumbnail } from './Thumbnail';
import { MusicInfo, MusicStatus } from './types';

type CompactMusicPlayerProps = {
  music: MusicInfo;
  state: MusicStatus;
};

export function CompactMusicPlayer({ music, state }: CompactMusicPlayerProps) {
  return (
    <DynamicIsland.Compact
      leading={
        <div css={leadingWrapperCss}>
          <Thumbnail music={music} status={state} style={{ width: 26, height: 26, borderRadius: 6 }} />
        </div>
      }
      trailing={
        <div css={trailingWrapperCss}>
          <Equalizer music={music} isPlaying={state !== 'paused'} />
        </div>
      }
    />
  );
}

const leadingWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingLeft: '8px',
});

const trailingWrapperCss = css({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingRight: '8px',
});
