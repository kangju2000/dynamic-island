import { motion } from 'framer-motion';
import { memo, useEffect } from 'react';
import { MusicInfo } from './types';
import { getAverageColor, getRandomHeightKeyframes } from './utils';

type EqualizerProps = {
  music: MusicInfo;
  isPlaying: boolean;
};

export const Equalizer = memo(function Equalizer({ music, isPlaying }: EqualizerProps) {
  useEffect(() => {
    getAverageColor(music.thumbnail).then(color => {
      document.documentElement.style.setProperty('--equalizer-color', color);
    });
  }, [music.id]);

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{ verticalAlign: 'start' }}>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <motion.rect
            key={index}
            initial={{ y: 11, height: 2 }}
            animate={isPlaying ? getRandomHeightKeyframes(10) : { y: 11, height: 2 }}
            transition={
              isPlaying
                ? { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                : { duration: 0.5, ease: 'easeInOut' }
            }
            x={3 + index * 4}
            width="2"
            rx="1"
            fill="var(--equalizer-color, #eee)"
          />
        );
      })}
    </svg>
  );
});
