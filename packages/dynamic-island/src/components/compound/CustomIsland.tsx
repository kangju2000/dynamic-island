import { css } from '@emotion/react';
import { getSvgPath } from 'figma-squircle';
import { type HTMLMotionProps, motion, cubicBezier, useWillChange } from 'framer-motion';
import { squircleVariant } from '../../constant';
import type { Squircle } from '../../types';

type CustomIsland = {
  squircle?: Squircle;
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function CustomIsland({ squircle, children, style, ...props }: CustomIsland) {
  const willChange = useWillChange();
  const customSquircle = {
    width: squircle?.width ?? squircleVariant.default.width,
    height: squircle?.height ?? squircleVariant.default.height,
    cornerRadius: squircle?.cornerRadius ?? squircleVariant.default.cornerRadius,
    cornerSmoothing: squircle?.cornerSmoothing ?? squircleVariant.default.cornerSmoothing,
  };

  return (
    <div css={wrapperCss} style={{ width: customSquircle.width, height: customSquircle.height }}>
      <motion.div
        initial={{
          width: squircleVariant.default.width,
          height: squircleVariant.default.height,
          clipPath: `path("${getSvgPath(squircleVariant.default)}")`,
        }}
        animate={{
          width: customSquircle.width,
          height: customSquircle.height,
          clipPath: `path("${getSvgPath(customSquircle)}")`,
        }}
        exit={{
          width: squircleVariant.default.width,
          height: squircleVariant.default.height,
          clipPath: `path("${getSvgPath(squircleVariant.default)}")`,
        }}
        css={customIslandCss}
        style={{ willChange }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            filter: 'blur(10px)',
            rotateX: 45,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            rotateX: 0,
            transition: { delay: 0.08 },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            filter: 'blur(10px)',
            rotateX: 45,
            transition: { delay: 0 },
          }}
          transition={{ duration: 4 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: customSquircle.width,
            height: customSquircle.height,
            ...style,
          }}
          {...props}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

const wrapperCss = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
});

const customIslandCss = css({
  backgroundColor: '#000',
  overflow: 'hidden',
});
