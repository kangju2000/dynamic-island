import { css } from '@emotion/react';
import { getSvgPath } from 'figma-squircle';
import { type HTMLMotionProps, motion, useWillChange } from 'framer-motion';
import { squircleVariant, variantPathMap } from '../../constant';
import type { Squircle } from '../../types';

type CustomIsland = {
  squircle?: Squircle;
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function CustomIsland({ squircle = squircleVariant.custom, children, ...props }: CustomIsland) {
  const willChange = useWillChange();

  return (
    <motion.div
      initial={{
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: variantPathMap.default,
      }}
      animate={{
        width: squircle.width,
        height: squircle.height,
        clipPath: `path("${getSvgPath(squircle)}")`,
      }}
      exit={{
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: variantPathMap.default,
        transition: { type: 'spring', stiffness: 150, damping: 18, mass: 0.5 },
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
