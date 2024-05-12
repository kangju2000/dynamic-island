import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { MusicInfo } from './types';

type BarProps = {
  time: number;
  music: MusicInfo;
};

export function Bar({ time, music }: BarProps) {
  return (
    <div css={outerBarCss}>
      <motion.div
        initial={false}
        animate={{ width: `${(time / music.playTime) * 100}%` }}
        transition={{ ease: 'linear' }}
        css={innerBarCss}
      />
    </div>
  );
}

const outerBarCss = css({
  width: '100%',
  margin: '0 auto',
  height: '7px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  overflow: 'hidden',
});

const innerBarCss = css({
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
});
