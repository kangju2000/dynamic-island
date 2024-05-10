import { css } from '@emotion/react';
import { DynamicIsland } from '@kangju2000/dynamic-island';
import { getSvgPath } from 'figma-squircle';
import { motion, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IconBack, IconPause, IconNext, IconAirplay, IconPlay } from '../../assets/index';
import { Bar } from './Bar';
import { Equalizer } from './Equalizer';
import { musicList } from './const';

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export function MusicPlayer() {
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scopeThumbnail, animateThumbnail] = useAnimate();
  const thumbnailPath = getSvgPath({ width: 60, height: 60, cornerRadius: 16, cornerSmoothing: 0.6 });
  const initialRef = useRef<boolean>(true);

  const currentMusic = musicList[currentMusicIndex];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime >= currentMusic.playTime) {
            setCurrentMusicIndex((currentMusicIndex + 1) % musicList.length);
            return 0;
          }

          return prevTime + 0.1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(true);
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }

    setTime(0);
    animateThumbnail(
      scopeThumbnail.current,
      {
        rotateY: [0, -180, 0],
        scaleX: [1, -1, 1],
      },
      { duration: 1 }
    );
  }, [currentMusicIndex]);

  return (
    <DynamicIsland.Expanded>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0, transition: { delay: 0.1 } }}
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        css={musicPlayerCss}
      >
        <div css={musicInfoCss}>
          <motion.div
            ref={scopeThumbnail}
            animate={{
              scale: isPlaying ? 1 : 0.9,
              filter: isPlaying ? 'opacity(1)' : 'opacity(0.6)',
              transition: {
                scale: { duration: 0.35 },
                filter: { duration: 0.35 },
              },
            }}
            css={thumbnailWrapperCss}
          >
            <img src={currentMusic.thumbnail} css={thumbnailCss} style={{ clipPath: `path("${thumbnailPath}")` }} />
            <div css={backfaceCss} style={{ clipPath: `path("${thumbnailPath}")` }} />
          </motion.div>
          <div style={{ flex: 1 }}>
            <p css={titleCss}>{currentMusic.title}</p>
            <p css={artistCss}>{currentMusic.artist}</p>
          </div>
          <Equalizer isPlaying={isPlaying} />
        </div>
        <div css={timeWrapperCss}>
          <p css={timeCss} style={{ left: 0 }}>
            {formatTime(time)}
          </p>
          <Bar time={time} music={currentMusic} />
          <p css={timeCss} style={{ right: 0 }}>
            -{formatTime(currentMusic.playTime - time)}
          </p>
        </div>
        <div css={playerWrapperCss}>
          <IconBack
            width={38}
            height={38}
            onClick={() => setCurrentMusicIndex((currentMusicIndex - 1 + musicList.length) % musicList.length)}
          />
          {isPlaying ? (
            <IconPause width={40} height={40} onClick={() => setIsPlaying(false)} />
          ) : (
            <IconPlay width={40} height={40} onClick={() => setIsPlaying(true)} />
          )}
          <IconNext
            width={38}
            height={38}
            onClick={() => setCurrentMusicIndex((currentMusicIndex + 1) % musicList.length)}
          />
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
  color: 'rgba(255, 255, 255, 0.6)',
});

const thumbnailWrapperCss = css({
  position: 'relative',
  width: '65px',
  height: '65px',
  transformStyle: 'preserve-3d',
});

const thumbnailCss = css({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  backfaceVisibility: 'hidden',
});

const backfaceCss = css(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'rotateY(180deg)',
  },
  thumbnailCss
);

const timeWrapperCss = css({
  position: 'relative',
});

const timeCss = css({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.6)',
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
