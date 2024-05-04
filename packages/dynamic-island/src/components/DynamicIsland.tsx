import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import { type DynamicIslandVariant } from '..';
import { CompactIsland } from './compound/CompactIsland';
import { CustomIsland } from './compound/CustomIsland';
import { ExpandedIsland } from './compound/ExpandedIsland';
import { MinimalIsland } from './compound/MinimalIsland';
import { Notch } from './compound/Notch';

export type DynamicIslandProps = {
  variant: DynamicIslandVariant;
  /**
   * The minimal presentation in the Dynamic Island.
   */
  minimal?: React.ReactNode;
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
  notchProps?: React.ComponentProps<typeof Notch>;
} & React.ComponentProps<'div'>;

function Root({ variant, minimal, compact, expanded, custom, notchProps, ...props }: DynamicIslandProps) {
  return (
    <div css={wrapperCss} {...props}>
      <Notch css={notchCss} {...notchProps} />
      <AnimatePresence mode="wait">
        {variant === 'compact' && <Fragment key="compact">{compact}</Fragment>}
        {variant === 'expanded' && <Fragment key="expanded">{expanded}</Fragment>}
        {variant === 'custom' && <Fragment key="custom">{custom}</Fragment>}
        {variant === 'minimal' && <Fragment key="minimal">{minimal}</Fragment>}
      </AnimatePresence>
    </div>
  );
}

const wrapperCss = css({
  position: 'relative',
  width: 'max-content',
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
    Minimal: MinimalIsland,
    Custom: CustomIsland,
  }
);
