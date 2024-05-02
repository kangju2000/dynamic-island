import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { type DynamicIslandVariant } from '..';
import { CompactIsland } from './CompactIsland';
import { ExpandedIsland } from './ExpandedIsland';
import { MinimalIsland } from './MinimalIsland';
import { Notch } from './Notch';

export type DynamicIslandProps = {
  variant: DynamicIslandVariant;
  /**
   * The minimal presentation in the Dynamic Island.
   */
  minimal?: React.ReactNode;
  /**
   * The compact leading presentation in the Dynamic Island.
   */
  compactLeading?: React.ReactNode;
  /**
   * The compact trailing presentation in the Dynamic Island.
   */
  compactTrailing?: React.ReactNode;
  /**
   * The expanded presentation in the Dynamic Island.
   */
  expanded?: React.ReactNode;
  children?: React.ReactNode;
};

export function DynamicIsland({ variant, minimal, compactLeading, compactTrailing, expanded }: DynamicIslandProps) {
  return (
    <div css={wrapperCss}>
      <Notch css={notchCss} />
      <AnimatePresence mode="wait">
        {variant === 'compact' && <CompactIsland key="compact" leading={compactLeading} trailing={compactTrailing} />}
        {variant === 'expanded' && <ExpandedIsland key="expanded">{expanded}</ExpandedIsland>}
        {/* {variant === 'minimal' && <MinimalIsland>{minimal}</MinimalIsland>} */}
      </AnimatePresence>
    </div>
  );
}

const wrapperCss = css({
  position: 'relative',
});

const notchCss = css({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
});
