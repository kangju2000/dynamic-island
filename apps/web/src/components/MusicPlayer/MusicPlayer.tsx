import { css } from '@emotion/react';
import { DynamicIsland } from '@kangju2000/dynamic-island';
import { AnimatePresence, motion } from 'framer-motion';
import { cubicBezier } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IconPause, IconAirplay, IconPlay } from '../../assets/index';
import { Bar } from './Bar';
import { Equalizer } from './Equalizer';
import { Thumbnail } from './Thumbnail';
import { MusicInfo, MusicState } from './types';
import { formatTime } from './utils';

type MusicPlayerProps = {
  music: MusicInfo;
  state: MusicState;
  time: number;
  onTimeChange: Dispatch<SetStateAction<number>>;
  onMusicChange?: (state: MusicState) => void;
};

export function MusicPlayer({ music, state, time, onTimeChange, onMusicChange }: MusicPlayerProps) {
  const timeoutId = useRef<number>(0);
  const [prevArrowList, setPrevArrowList] = useState([1, 2, 3]);
  const [nextArrowList, setNextArrowList] = useState([1, 2, 3]);

  const handleNextMusic = () => {
    onMusicChange?.('next');
    onTimeChange(0);
  };

  const handlePrevMusic = () => {
    onMusicChange?.('previous');
    onTimeChange(0);
  };

  useEffect(() => {
    if (state === 'paused') {
      return;
    }

    const timeout = 100;
    const interval = setInterval(() => {
      onTimeChange(prev => prev + timeout / 1000);
    }, timeout);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  useEffect(() => {
    if (state === 'playing') {
      return;
    }

    onMusicChange?.('playing');

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
          <Thumbnail
            squircle={{ width: 60, height: 60, cornerRadius: 16, cornerSmoothing: 0.6 }}
            music={music}
            state={state}
          />
          <div style={{ flex: 1, whiteSpace: 'nowrap' }}>
            <p css={titleCss}>{music.title}</p>
            <p css={artistCss}>{music.artist}</p>
          </div>
          <Equalizer music={music} isPlaying={state !== 'paused'} />
        </div>

        <div style={{ flexShrink: 0, height: '16px' }} />
        <div css={timeWrapperCss}>
          <p css={timeCss}>{formatTime(time)}</p>
          <Bar time={time} music={music} />
          <p css={timeCss} style={{ textAlign: 'right' }}>
            -{formatTime(music.playTime - time)}
          </p>
        </div>

        <div style={{ flexShrink: 0, height: '8px' }} />

        <div css={playerWrapperCss}>
          <motion.div
            whileTap={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            css={playerIconAreaCss}
            onClick={() => {
              handlePrevMusic();
              setPrevArrowList(prev => {
                const temp = [...prev];
                const first = temp.shift();
                temp.push(first!);
                return temp;
              });
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
              key={state}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.08 }}
              whileTap={{ scale: 0.8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              css={playerIconAreaCss}
              onClick={() => {
                onMusicChange?.(state === 'paused' ? 'playing' : 'paused');
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5, ease: cubicBezier(0.34, 1.56, 0.64, 1) }}
              >
                {state === 'paused' ? <IconPlay width={40} height={40} /> : <IconPause width={40} height={40} />}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            whileTap={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            css={playerIconAreaCss}
            onClick={() => {
              handleNextMusic();
              setNextArrowList(prev => {
                const temp = [...prev];
                const last = temp.pop();
                temp.unshift(last!);
                return temp;
              });
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
  userSelect: 'none',
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
