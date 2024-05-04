import { css } from '@emotion/react';
import { getSvgPath } from 'figma-squircle';
import { type HTMLMotionProps, motion, useWillChange } from 'framer-motion';
import { squircleVariant } from '../../constant';
import type { Squircle } from '../../types';

type CustomIsland = {
  squircle?: Squircle;
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function CustomIsland({ squircle, children, ...props }: CustomIsland) {
  const willChange = useWillChange();
  const customSquircle = {
    width: squircle?.width ?? squircleVariant.default.width,
    height: squircle?.height ?? squircleVariant.default.height,
    cornerRadius: squircle?.cornerRadius ?? squircleVariant.default.cornerRadius,
    cornerSmoothing: squircle?.cornerSmoothing ?? squircleVariant.default.cornerSmoothing,
  };

  return (
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
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 12,
        mass: 0.5,
      }}
      css={customIslandCss}
      style={{ willChange }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const customIslandCss = css({
  position: 'relative',
  backgroundColor: '#000',
  overflow: 'hidden',
});
