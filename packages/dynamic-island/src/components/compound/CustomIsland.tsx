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
    width: squircle?.width ?? squircleVariant.custom.width,
    height: squircle?.height ?? squircleVariant.custom.height,
    cornerRadius: squircle?.cornerRadius ?? squircleVariant.custom.cornerRadius,
    cornerSmoothing: squircle?.cornerSmoothing ?? squircleVariant.custom.cornerSmoothing,
    preserveSmoothing: squircle?.preserveSmoothing ?? squircleVariant.custom.preserveSmoothing,
  };

  return (
    <motion.div
      initial={{
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: variantPathMap.default,
      }}
      animate={{
        width: customSquircle.width,
        height: customSquircle.height,
        clipPath: `path("${getSvgPath(customSquircle)}")`,
      }}
      exit={{
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
