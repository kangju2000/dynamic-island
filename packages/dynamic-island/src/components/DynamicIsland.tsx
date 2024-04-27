import { css } from "@emotion/react";
import { getSvgPath } from "figma-squircle";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useWillChange,
} from "framer-motion";
import { useEffect, useState } from "react";
import { type DynamicIslandVariant } from "..";
import { sizeMap } from "../constant";
import { usePrevious } from "../hooks/usePrevious";

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
};

export function DynamicIsland({
  variant: _variant,
  minimal,
  compactLeading,
  compactTrailing,
  expanded,
}: DynamicIslandProps) {
  const willChange = useWillChange();
  const previousVariant = usePrevious(_variant);
  const [variant, setVariant] = useState<DynamicIslandVariant>(_variant);
  const params = sizeMap[variant];
  const islandPath = getSvgPath(params);
  const minimalPath = getSvgPath({ ...params, width: 45, height: 36.67 });

  const renderContent = () => {
    switch (variant) {
      case "compact":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              width: sizeMap.compact.width,
              display: "flex",
              justifyContent: "center",
              wordBreak: "break-word",
            }}
          >
            {compactLeading}
            <div style={{ minWidth: sizeMap.default.width }} />
            {compactTrailing}
          </motion.div>
        );
      case "expanded":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {expanded}
          </motion.div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (previousVariant !== "default" && _variant !== "default") {
      setVariant("default");
    } else {
      setVariant(_variant);
    }
  }, [_variant]);

  return (
    <div css={wrapperCss}>
      <motion.div
        initial="default"
        animate={variant}
        custom={{
          width: params.width,
          height: params.height,
          clipPath: `path("${islandPath}")`,
        }}
        variants={{
          default: (rest) => ({ ...rest }),
          compact: (rest) => ({ ...rest }),
          minimal: (rest) => ({
            ...rest,
            x: -36.67 / 2,
            transition: {
              stiffness: 300,
              mass: 0.1,
              type: "spring",
              damping: 30,
            },
          }),
        }}
        {...(variant === "default"
          ? {
              whileTap: {
                scale: 1.1,
                transition: {
                  ease: cubicBezier(0.47, 0.0, 0.745, 0.715),
                  duration: 0.3,
                  repeat: 1,
                  repeatType: "reverse",
                },
              },
            }
          : {})}
        onAnimationComplete={() => {
          if (variant !== _variant) setVariant(_variant);
        }}
        css={islandCss}
        style={{
          willChange,
          width: params.width,
          height: params.height,
          borderRadius: params.cornerRadius,
          clipPath: `path("${islandPath}")`,
        }}
      >
        <AnimatePresence>{renderContent()}</AnimatePresence>
      </motion.div>
      <svg width="120" height="72" css={splitEffectCss}>
        <defs>
          <filter
            id="split-effect"
            width="400%"
            x="-150%"
            height="400%"
            y="-150%"
          >
            <motion.feGaussianBlur
              in="SourceGraphic"
              animate={variant}
              variants={{
                default: { stdDeviation: 0, transition: { duration: 0.1 } },
                compact: { stdDeviation: 0, transition: { duration: 0.1 } },
                minimal: {
                  stdDeviation: [null, 10, 0],
                  transition: { duration: 0.4 },
                },
              }}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      0 0 0 25 -10"
              result="matrix"
            />
          </filter>
        </defs>
        <g filter="url(#split-effect)">
          <circle cx="36" cy="36" r="18" fill="black" />
          <motion.rect
            initial={false}
            animate={
              variant === "minimal"
                ? {
                    x: 50,
                    transition: {
                      stiffness: 300,
                      mass: 0.1,
                      type: "spring",
                      damping: 30,
                    },
                  }
                : { x: 0, transition: { duration: 0.3 } }
            }
            x="18"
            y="18"
            width="40"
            height="36"
            rx="18"
            fill="black"
          />
        </g>
      </svg>

      <motion.div
        initial={false}
        animate={
          variant === "minimal"
            ? {
                opacity: 1,
                x: 36.67,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.3 },
              }
            : { opacity: 0, scale: 0.5, filter: "blur(4px)" }
        }
        css={minimalIslandCss}
        style={{
          willChange,
          width: "40px",
          height: "36.67px",
          borderRadius: params.cornerRadius,
          clipPath: `path("${minimalPath}")`,
        }}
      >
        {minimal}
      </motion.div>
    </div>
  );
}

const wrapperCss = css({
  position: "relative",
});

const islandCss = css({
  backgroundColor: "#000000",
  cursor: "pointer",
});

const splitEffectCss = css({
  position: "absolute",
  right: "-45px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: -1,
});

const minimalIslandCss = css({
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 9999,
  backgroundColor: "#000000",
  overflow: "hidden",
});
