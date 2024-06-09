import { motion } from 'framer-motion';
import { memo } from 'react';

type EqualizerProps = {
  isPlaying: boolean;
};

export const Equalizer = memo(function Equalizer({ isPlaying }: EqualizerProps) {
  const getRandomHeightKeyframes = (times: number, minHeight = 2, maxHeight = 20) => {
    const keyframes = Array.from({ length: times }).reduce<{ y: number[]; height: number[] }>(
      acc => {
        const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        acc.y.push(12 - randomHeight / 2);
        acc.height.push(randomHeight);
        return acc;
      },
      { y: [11], height: [2] }
    );

    return keyframes;
  };

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
            fill="#eee"
          />
        );
      })}
    </svg>
  );
});
