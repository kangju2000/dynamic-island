import { css } from '@emotion/react';
import { getSvgPath } from 'figma-squircle';
import { motion } from 'framer-motion';
import { squircleVariant } from '../../constant';

type MinimalIslandProps = {
  children: React.ReactNode;
};

export function MinimalIsland({ children }: MinimalIslandProps) {
  return (
    <div style={{ position: 'relative' }}>
      <SplitEffect />
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          x: 36.67,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
        css={minimalIslandCss}
        style={{
          width: sizeMap.minimal.width,
          height: sizeMap.minimal.height,
          backgroundColor: "#000",
          clipPath: `path("${getSvgPath(sizeMap.minimal)}")`,
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div> */}
    </div>
  );
}

function SplitEffect() {
  return (
    <svg width="227" height="72" css={splitEffectCss}>
      <defs>
        <filter id="split-effect" width="400%" x="-150%" height="400%" y="-150%">
          <motion.feGaussianBlur
            in="SourceGraphic"
            animate={{
              stdDeviation: [null, 10, 0],
              transition: { duration: 0.4 },
            }}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 25 -10"
            result="matrix"
          />
        </filter>
      </defs>
      <g filter="url(#split-effect)">
        <motion.rect
          initial={{ x: 50 }}
          animate={{
            x: 0,
            transition: {
              stiffness: 300,
              mass: 0.1,
              type: 'spring',
              damping: 30,
            },
          }}
          style={{
            width: squircleVariant.default.width,
            height: squircleVariant.default.height,
            backgroundColor: '#000',
            clipPath: `path("${getSvgPath(squircleVariant.default)}")`,
            overflow: 'hidden',
          }}
        />
        {/* <rect
          x={50}
          // cx={sizeMap.minimal.width / 2}
          // cy={sizeMap.minimal.height / 2}
          // r={sizeMap.minimal.height / 2}
          // fill="black"
          style={{
            width: sizeMap.default.width,
            height: sizeMap.default.height,
            // backgroundColor: "#000",
            clipPath: `path("${getSvgPath(sizeMap.default)}")`,
            overflow: "hidden",
          }}
        /> */}
        <motion.rect
          animate={{
            // transform: "translateX(100%) translateX(-45px)",
            transition: {
              stiffness: 300,
              mass: 0.1,
              type: 'spring',
              damping: 30,
            },
          }}
          style={{
            transform: 'translateX(50%)',
            transformOrigin: 'center',
            width: squircleVariant.minimal.width,
            height: squircleVariant.minimal.height,
            backgroundColor: '#000',
            clipPath: `path("${getSvgPath(squircleVariant.minimal)}")`,
            overflow: 'hidden',
          }}

          // y="18"
          // width="40"
          // height="36"
          // rx="18"
          // fill="black"
        />
      </g>
    </svg>
  );
}

const splitEffectCss = css({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  // left: sizeMap.minimal.width / 2,
  zIndex: -1,
});

const minimalIslandCss = css({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 9999,
  backgroundColor: '#000000',
  overflow: 'hidden',
});
