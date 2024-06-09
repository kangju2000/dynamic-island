import { css } from '@emotion/react';
import { Squircle } from '@kangju2000/dynamic-island';
import { getSvgPath } from 'figma-squircle';
import { cubicBezier, motion, useAnimate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { usePrevious } from '../../hooks/usePrevious';
import { MusicInfo, MusicState } from './types';

type ThumbnailProps = {
  music: MusicInfo;
  state: MusicState;
  squircle?: Squircle;
};

export function Thumbnail({ music, state, squircle }: ThumbnailProps) {
  const [scopeThumbnail, animateThumbnail] = useAnimate();
  const thumbnailPath = getSvgPath(squircle);
  const initialRender = useRef(true);

  const prevMusicId = usePrevious(music.id);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (prevMusicId !== music.id) {
      animateThumbnail(
        [scopeThumbnail.current, scopeThumbnail.current.firstChild],
        { rotateY: [0, state === 'next' ? -180 : 180, 0] },
        {
          duration: 2,
          times: [0, 0.25, 1],
          ease: ['linear', cubicBezier(0.5, 1.5, 0.5, 1)],
        }
      );
    }
  }, [music.id]);

  return (
    <motion.div
      ref={scopeThumbnail}
      animate={{
        scale: state === 'paused' ? 0.9 : 1,
        filter: `opacity(${state === 'paused' ? 0.6 : 1})`,
        transition: { duration: 0.35 },
      }}
      style={{ width: `${squircle.width + 5}px`, height: `${squircle.height + 5}px` }}
      css={thumbnailWrapperCss}
    >
      <div
        css={thumbnailCss}
        className="thumbnail"
        style={{ width: `${squircle.width}px`, height: `${squircle.height}px` }}
      >
        <img src={music.thumbnail} css={thumbnailFrontCss} style={{ clipPath: `path("${thumbnailPath}")` }} />
        <img src={music.thumbnail} css={thumbnailBackCss} style={{ clipPath: `path("${thumbnailPath}")` }} />
      </div>
    </motion.div>
  );
}

const thumbnailWrapperCss = css({
  flexShrink: 0,
  perspective: '260px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
