import { css } from '@emotion/react';
import { type FigmaSquircleParams, getSvgPath } from 'figma-squircle';
import { type HTMLMotionProps, motion, useWillChange } from 'framer-motion';
import { squircleVariant, variantPathMap } from '../../constant';
import type { Squircle } from '../../types';

type CustomIsland = {
  squircle?: Squircle;
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function CustomIsland({ squircle, children, ...props }: CustomIsland) {
  const willChange = useWillChange();
  const customSquircle: FigmaSquircleParams = {
    width: squircle?.width ?? squircleVariant.default.width,
    height: squircle?.height ?? squircleVariant.default.height,
    cornerRadius: squircle?.cornerRadius ?? squircleVariant.default.cornerRadius,
    cornerSmoothing: squircle?.cornerSmoothing ?? squircleVariant.default.cornerSmoothing,
    preserveSmoothing: squircle?.preserveSmoothing ?? squircleVariant.default.preserveSmoothing,
  };

  return (
    <motion.div
      initial={{
        scale: 0,
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: variantPathMap.default,
      }}
      animate={{
        scale: 1,
        width: customSquircle.width,
        height: customSquircle.height,
        clipPath: `path("${getSvgPath(customSquircle)}")`,
      }}
      exit={{
        scale: 0,
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: variantPathMap.default,
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
  borderRadius: '32px',
  overflow: 'hidden',
});
