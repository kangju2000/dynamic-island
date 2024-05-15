import { css } from '@emotion/react';
import { HTMLMotionProps, motion, useWillChange } from 'framer-motion';
import { squircleVariant, variantPathMap } from '../../constant';

type ExpandIslandProps = {
  children: React.ReactNode;
} & HTMLMotionProps<'div'>;

export function ExpandedIsland({ children, ...props }: ExpandIslandProps) {
  const willChange = useWillChange();

  return (
    <motion.div
      initial={{
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: variantPathMap.default,
      }}
      animate={{
        width: squircleVariant.expanded.width,
        height: squircleVariant.expanded.height,
        clipPath: variantPathMap.expanded,
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
  borderRadius: '32px',
});
