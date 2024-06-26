import { css } from '@emotion/react';
import { HTMLMotionProps, motion, useWillChange } from 'framer-motion';
import { variantStyleMap } from '../../constant';

type ExpandIslandProps = {
  children: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function ExpandedIsland({ children, ...props }: ExpandIslandProps) {
  const willChange = useWillChange();

  return (
    <motion.div
      initial={variantStyleMap.default}
      animate={{
        ...variantStyleMap.expanded,
        transition: { type: 'spring', stiffness: 100, damping: 12, mass: 0.5 },
      }}
      exit={{
        ...variantStyleMap.default,
        transition: { type: 'spring', stiffness: 150, damping: 18, mass: 0.5 },
      }}
      css={expandedIslandCss}
      style={{ willChange }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const expandedIslandCss = css({
  position: 'relative',
  backgroundColor: '#000',
  overflow: 'hidden',
});
