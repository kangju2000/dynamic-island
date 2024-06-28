import { css } from '@emotion/react';
import { type HTMLMotionProps, motion, useWillChange } from 'framer-motion';
import { variantStyleMap } from '../../constant';
import type { VariantStyle } from '../../types';

type CustomIsland = {
  variantStyle?: VariantStyle;
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function CustomIsland({ variantStyle, children, ...props }: CustomIsland) {
  const willChange = useWillChange();

  return (
    <motion.div
      initial={variantStyleMap.default}
      animate={{
        ...(variantStyle || variantStyleMap.custom),
        transition: { type: 'spring', stiffness: 100, damping: 12, mass: 0.5 },
      }}
      exit={{
        ...variantStyleMap.default,
        transition: { type: 'spring', stiffness: 150, damping: 18, mass: 0.5 },
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
