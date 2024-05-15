import { css } from '@emotion/react';
import { DynamicIsland } from '@kangju2000/dynamic-island';
import { getSvgPath } from 'figma-squircle';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { cubicBezier } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IconPause, IconAirplay, IconPlay } from '../../assets/index';
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
  const timeoutId = useRef<number>(0);
  const [prevArrowList, setPrevArrowList] = useState([1, 2, 3]);
  const [nextArrowList, setNextArrowList] = useState([1, 2, 3]);

  const currentMusic = musicList[currentMusicIndex];

  const handleProgress = (timeout: number) => {
    setTime(prevTime => {
      const nextTime = prevTime + timeout / 1000;
      if (nextTime >= currentMusic.playTime) {
        handleNextMusic();
        return 0;
      }

      return nextTime;
    });
  };

  const handleNextMusic = () => {
    setCurrentMusicIndex((currentMusicIndex + 1) % musicList.length);
    setIsPlaying(true);
    setTime(0);
    animateThumbnail(
      [scopeThumbnail.current, scopeThumbnail.current.firstChild],
      { rotateY: [0, -180, 0] },
      {
        duration: 2,
        times: [0, 0.25, 1],
        ease: ['linear', cubicBezier(0.5, 1.5, 0.5, 1)],
        // onUpdate: (values: number) => {
        //   console.log(Math.abs(values) / 180);
        //   scopeThumbnail.current.style.WebkitMaskImage = `linear-gradient(90deg, rgba(0,0,0,${Math.abs(values) / 180}) 50%, transparent 100%)`;
        // },
      }
    );
  };

  const handlePrevMusic = () => {
    setCurrentMusicIndex((currentMusicIndex - 1 + musicList.length) % musicList.length);
    setIsPlaying(true);
    setTime(0);
    animateThumbnail(
      [scopeThumbnail.current, scopeThumbnail.current.firstChild],
      { rotateY: [0, 180, 0] },
      {
        duration: 2,
        times: [0, 0.25, 1],
        ease: ['linear', cubicBezier(0.5, 1.5, 0.5, 1)],
      }
    );
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timeout = 100;
    const interval = setInterval(() => handleProgress(timeout), timeout);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(true);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <DynamicIsland.Expanded>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0, transition: { delay: 0.15 } }}
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        css={musicPlayerCss}
      >
        <div css={musicInfoCss}>
          <motion.div
            ref={scopeThumbnail}
            animate={{
              scale: isPlaying ? 1 : 0.9,
              filter: isPlaying ? 'opacity(1)' : 'opacity(0.6)',
              transition: { duration: 0.35 },
            }}
            css={thumbnailWrapperCss}
          >
            <div css={thumbnailCss} className="thumbnail">
              <img
                src={currentMusic.thumbnail}
                css={thumbnailFrontCss}
                style={{ clipPath: `path("${thumbnailPath}")` }}
              />
              <img
                src={currentMusic.thumbnail}
                css={thumbnailBackCss}
                style={{ clipPath: `path("${thumbnailPath}")` }}
              />
            </div>
          </motion.div>
          <div style={{ flex: 1, whiteSpace: 'nowrap' }}>
            <p css={titleCss}>{currentMusic.title}</p>
            <p css={artistCss}>{currentMusic.artist}</p>
          </div>
          <Equalizer isPlaying={isPlaying} />
        </div>

        <div style={{ flexShrink: 0, height: '16px' }} />
        <div css={timeWrapperCss}>
          <p css={timeCss}>{formatTime(time)}</p>
          <Bar time={time} music={currentMusic} />
          <p css={timeCss} style={{ textAlign: 'right' }}>
            -{formatTime(currentMusic.playTime - time)}
          </p>
        </div>

        <div style={{ flexShrink: 0, height: '8px' }} />

        <div css={playerWrapperCss}>
          <motion.div
            whileTap={{ scale: 0.8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            css={playerIconAreaCss}
            onClick={() => {
              handlePrevMusic();
              timeoutId.current = setTimeout(() => {
                setPrevArrowList(prev => {
                  const temp = [...prev];
                  const first = temp.shift();
                  temp.push(first!);
                  return temp;
                });
              }, 200);
            }}
          >
            <AnimatePresence mode="popLayout">
              {prevArrowList.slice(0, 2).map(item => {
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, ease: cubicBezier(0.34, 1.56, 0.64, 1) }}
                    layout
                  >
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.386 19C14.9188 19 14.5047 18.8408 13.9738 18.533L1.36977 11.2302C0.424734 10.6888 -6.80448e-08 10.2324 -6.80448e-08 9.5C-6.80448e-08 8.77821 0.424734 8.32179 1.36977 7.76983L13.9738 0.467039C14.5047 0.159218 14.9188 0 15.386 0C16.3098 0 17 0.711173 17 1.84693V17.1531C17 18.2994 16.3098 19 15.386 19Z"
                        fill="white"
                      />
                    </svg>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={isPlaying ? 'pause' : 'play'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.08 }}
              whileTap={{ scale: 0.8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              css={playerIconAreaCss}
              onClick={() => setIsPlaying(prev => !prev)}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5, ease: cubicBezier(0.34, 1.56, 0.64, 1) }}
              >
                {isPlaying ? <IconPause width={40} height={40} /> : <IconPlay width={40} height={40} />}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            whileTap={{ scale: 0.8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            css={playerIconAreaCss}
            onClick={() => {
              handleNextMusic();
              timeoutId.current = setTimeout(() => {
                setNextArrowList(prev => {
                  const temp = [...prev];
                  const last = temp.pop();
                  temp.unshift(last!);
                  return temp;
                });
              }, 200);
            }}
          >
            <AnimatePresence mode="popLayout">
              {nextArrowList.slice(0, 2).map(item => {
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, ease: cubicBezier(0.34, 1.56, 0.64, 1) }}
                    layout
                  >
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.61399 19C2.0812 19 2.49532 18.8408 3.02623 18.533L15.6302 11.2302C16.5753 10.6888 17 10.2324 17 9.5C17 8.77821 16.5753 8.32179 15.6302 7.76983L3.02623 0.467039C2.49532 0.159218 2.0812 0 1.61399 0C0.690194 0 0 0.711173 0 1.84693V17.1531C0 18.2994 0.690194 19 1.61399 19Z"
                        fill="white"
                      />
                    </svg>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          <IconAirplay css={airplayCss} width={32} height={32} />
        </div>
      </motion.div>
    </DynamicIsland.Expanded>
  );
}

const musicPlayerCss = css({
  display: 'flex',
  flexDirection: 'column',
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
  flexShrink: 0,
  width: '65px',
  height: '65px',
  perspective: '260px',
});

const thumbnailCss = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
});

const thumbnailFrontCss = css({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  backfaceVisibility: 'hidden',
});

const thumbnailBackCss = css(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'rotateY(180deg) scaleX(-1)',
  },
  thumbnailFrontCss
);

const timeWrapperCss = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

const timeCss = css({
  flexShrink: 0,
  width: '40px',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.6)',
});

const playerWrapperCss = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const playerIconAreaCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  cursor: 'pointer',
});

const airplayCss = css({
  position: 'absolute',
  top: '50%',
  right: '24px',
  transform: 'translate(50%, -50%)',
});
