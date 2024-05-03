import { css } from '@emotion/react';
import { getSvgPath } from 'figma-squircle';
import { motion } from 'framer-motion';
import { squircleVariant } from '../../constant';

type ExpandIslandProps = {
  children: React.ReactNode;
};

export function ExpandedIsland({ children }: ExpandIslandProps) {
  return (
    <motion.div
      initial={{
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: `path("${getSvgPath(squircleVariant.default)}")`,
      }}
      animate={{
        width: squircleVariant.expanded.width,
        height: squircleVariant.expanded.height,
        clipPath: `path("${getSvgPath(squircleVariant.expanded)}")`,
      }}
      exit={{
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: `path("${getSvgPath(squircleVariant.default)}")`,
      }}
      css={expandedIslandCss}
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
