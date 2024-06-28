import { css } from '@emotion/react';
import { HTMLMotionProps, cubicBezier, motion, useAnimate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { usePrevious } from '../../hooks/usePrevious';
import { MusicInfo, MusicStatus } from './types';

type ThumbnailProps = {
  music: MusicInfo;
  status: MusicStatus;
} & HTMLMotionProps<'div'>;

export function Thumbnail({ music, status, ...props }: ThumbnailProps) {
  const [scopeThumbnail, animateThumbnail] = useAnimate();
  const initialRender = useRef(true);

  const prevMusicId = usePrevious(music.id);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (prevMusicId !== music.id) {
      animateThumbnail(
        [scopeThumbnail.current, scopeThumbnail.current.children[0]],
        { rotateY: [0, status === 'next' ? -180 : 180, 0] },
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
      {...props}
      ref={scopeThumbnail}
      animate={{
        scale: status === 'paused' ? 0.9 : 1,
        filter: `opacity(${status === 'paused' ? 0.6 : 1})`,
        transition: { duration: 0.35 },
      }}
      css={thumbnailWrapperCss}
    >
      <motion.div
        {...props}
        ref={scopeThumbnail}
        animate={{
          scale: status === 'paused' ? 0.9 : 1,
          filter: `opacity(${status === 'paused' ? 0.6 : 1})`,
          transition: { duration: 0.35 },
        }}
        css={thumbnailCss}
        className="thumbnail"
      >
        <img src={music.thumbnail} css={thumbnailFrontCss} />
      </motion.div>
    </motion.div>
  );
}

const thumbnailWrapperCss = css({
  flexShrink: 0,
  perspective: '260px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
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
  borderRadius: 'inherit',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
});
