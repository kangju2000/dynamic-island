import { css } from '@emotion/react';
import { DynamicIsland } from '@kangju2000/dynamic-island';
import { getSvgPath } from 'figma-squircle';
import { motion } from 'framer-motion';
import { IconBack, IconPause, IconNext, IconAirplay } from './../assets/index';

export function MusicPlayer() {
  const path = getSvgPath({ width: 60, height: 60, cornerRadius: 16, cornerSmoothing: 0.6 });

  const calPosByYPos = (y: number) => {
    return 12 - y / 2;
  };

  const getRandomHeightKeyframes = (times: number, minHeight = 2, maxHeight = 20) => {
    const keyframes = Array.from({ length: times }).reduce<{ y: number[]; height: number[] }>(
      acc => {
        const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        acc.y.push(12 - randomHeight / 2);
        acc.height.push(randomHeight);
        return acc;
      },
      { y: [], height: [] }
    );

    return keyframes;
  };

  return (
    <DynamicIsland.Expanded>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0, transition: { delay: 0.1 } }}
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        css={musicPlayerCss}
      >
        <motion.div css={musicInfoCss}>
          <motion.div css={thumbnailCss} style={{ clipPath: `path("${path}")` }} />
          <div style={{ flex: 1 }}>
            <p css={titleCss}>Title</p>
            <p css={artistCss}>Artist</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ verticalAlign: 'start' }}>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <motion.rect
                  key={index}
                  animate={getRandomHeightKeyframes(10)}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  x={3 + index * 4}
                  width="2"
                  rx="1"
                  fill="#eee"
                />
              );
            })}
          </svg>
        </motion.div>
        <div css={timeWrapperCss}>
          <p css={timeCss}>0:00</p>
          <div css={outerBarCss}>
            <motion.div css={innerBarCss} animate={{ width: '40%' }} transition={{ duration: 10, ease: 'linear' }} />
          </div>
          <p css={timeCss}>-3:00</p>
        </div>
        <div css={playerWrapperCss}>
          <IconBack width={38} height={38} />
          <IconPause width={40} height={40} />
          <IconNext width={38} height={38} />
          <IconAirplay css={airplayCss} width={32} height={32} />
        </div>
      </motion.div>
    </DynamicIsland.Expanded>
  );
}

const musicPlayerCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  height: '100%',
  padding: '24px',
});

const musicInfoCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const titleCss = css({
  fontWeight: 'bold',
  fontSize: '17px',
});

const artistCss = css({
  fontSize: '17px',
  opacity: 0.6,
});

const thumbnailCss = css({
  width: '65px',
  height: '65px',
  backgroundColor: '#333',
});

const timeWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const timeCss = css({
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.6)',
});

const outerBarCss = css({
  width: '100%',
  height: '7px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const innerBarCss = css({
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
});

const playerWrapperCss = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  svg: {
    cursor: 'pointer',
  },
});

const airplayCss = css({
  position: 'absolute',
  top: '50%',
  right: '24px',
  transform: 'translate(50%, -50%)',
});
