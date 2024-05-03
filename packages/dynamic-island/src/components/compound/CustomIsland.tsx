import { css } from '@emotion/react';
import { getSvgPath } from 'figma-squircle';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { squircleVariant } from '../../constant';
import type { Squircle } from '../../types';

type CustomIsland = {
  squircle?: Squircle;
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function CustomIsland({ squircle, children, ...props }: CustomIsland) {
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
      css={customIslandCss}
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
