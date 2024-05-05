import { css } from '@emotion/react';
import { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { squircleVariant, variantPathMap } from '../../constant';

type NotchProps = HTMLMotionProps<'div'>;

export const Notch = forwardRef<HTMLDivElement, NotchProps>(function Notch(props, ref) {
  const { style, ...restProps } = props;

  return (
    <motion.div
      ref={ref}
      css={notchCss}
      style={{
        width: squircleVariant.default.width,
        height: squircleVariant.default.height,
        clipPath: variantPathMap.default,
        ...style,
      }}
      {...restProps}
    />
  );
});

const notchCss = css({
  backgroundColor: '#000',
  pointerEvents: 'none',
});
