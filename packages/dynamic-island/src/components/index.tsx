import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import { type DynamicIslandVariant } from '..';
import { variantStyleMap } from '../constant';
import { CompactIsland } from './compound/CompactIsland';
import { CustomIsland } from './compound/CustomIsland';
import { ExpandedIsland } from './compound/ExpandedIsland';
import { Notch } from './compound/Notch';

export type DynamicIslandProps = {
  variant: DynamicIslandVariant;
  /**
   * The minimal presentation in the Dynamic Island.
   */
  // minimal?: React.ReactNode; // TODO
  /**
   * The compact presentation in the Dynamic Island.
   */
  compact?: React.ReactNode;
  /**
   * The expanded presentation in the Dynamic Island.
   */
  expanded?: React.ReactNode;
  /**
   * The custom presentation in the Dynamic Island.
   */
  custom?: React.ReactNode;
  /**
   * Fixed position of the Dynamic Island.
   * @default true
   */
  fixed?: boolean;
  /**
   * Whether the device has an iPhone notch.
   * @default true
   */
  hasIphoneNotch?: boolean;
} & React.ComponentProps<'div'>;

function Root({
  variant,
  compact,
  expanded,
  custom,
  fixed = true,
  hasIphoneNotch = true,
  ...props
}: DynamicIslandProps) {
  const render = {
    default: <Notch css={notchCss} />,
    compact,
    expanded,
    minimal: null, // TODO
    custom,
  }[variant];

  return (
    <div css={fixed ? fixedCss : relativeCss} {...props}>
      {hasIphoneNotch && <Notch css={notchCss} />}
      <AnimatePresence mode="wait">
        <Fragment key={variant}>{render}</Fragment>
      </AnimatePresence>
      {!fixed && variant === 'default' && <div style={{ height: variantStyleMap.default.height }} />}
    </div>
  );
}

const relativeCss = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
});

const fixedCss = css({
  position: 'fixed',
  top: '20px',
  display: 'flex',
  justifyContent: 'center',
});

const notchCss = css({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
});

export const DynamicIsland = Object.assign(
  Root,
  {},
  {
    Notch,
    Compact: CompactIsland,
    Expanded: ExpandedIsland,
    // Minimal: MinimalIsland, // TODO
    Custom: CustomIsland,
  }
);
