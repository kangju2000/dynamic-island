import { css } from "@emotion/react";
import { type FigmaSquircleParams, getSvgPath } from "figma-squircle";
import { cubicBezier, motion, useWillChange } from "framer-motion";
import { useState } from "react";
import { DynamicIslandVariant } from "..";

const sizeMap: Record<DynamicIslandVariant, FigmaSquircleParams> = {
  default: {
    width: 122,
    height: 36.67,
    cornerRadius: 32,
    cornerSmoothing: 0.6,
  },
  compact: {
    width: 155,
    height: 36.67,
    cornerRadius: 32,
    cornerSmoothing: 0.6,
  },
  minimal: {
    width: 155,
    height: 36.67,
    cornerRadius: 32,
    cornerSmoothing: 0.6,
  },
  half: { width: 366, height: 82, cornerRadius: 50, cornerSmoothing: 0 },
  extended: { width: 366, height: 200, cornerRadius: 48, cornerSmoothing: 0.6 },
};

export type DynamicIslandProps = {
  variant: DynamicIslandVariant;
  children?: React.ReactNode;
  minimal?: React.ReactNode;
};

export function DynamicIsland({
  children,
  variant,
  minimal,
}: DynamicIslandProps) {
  const params = sizeMap[variant];
  const islandPath = getSvgPath(params);
  const minimalPath = getSvgPath({ ...params, width: 45, height: 36.67 });
  const willChange = useWillChange();

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
          default: (rest) => ({
            ...rest,
            // transition: { stiffness: 400, damping: 30, type: "spring" },
          }),
          compact: (rest) => ({
            ...rest,
            // transition: { stiffness: 400, damping: 30, type: "spring" },
          }),
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
          half: (rest) => ({
            ...rest,
            transition: { stiffness: 400, damping: 30, type: "spring" },
          }),
        }}
        {...(variant !== "half" && variant !== "extended"
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
        css={islandCss}
        style={{
          willChange,
          width: params.width,
          height: params.height,
          borderRadius: params.cornerRadius,
          clipPath: `path("${islandPath}")`,
        }}
      >
        {children}
      </motion.div>
      <svg
        width="120"
        height="72"
        style={{
          position: "absolute",
          right: "-45px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
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
                half: { stdDeviation: 0, transition: { duration: 0.1 } },
              }}
              result="blur"
            ></motion.feGaussianBlur>
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      0 0 0 25 -10"
              result="matrix"
            ></feColorMatrix>
          </filter>
        </defs>
        <g filter="url(#split-effect)">
          <circle cx="36" cy="36" r="18" fill="black" />
          <motion.rect
            initial="default"
            animate={variant}
            variants={{
              default: { x: 0, transition: { duration: 0.3 } },
              compact: { x: 0, transition: { duration: 0.3 } },
              minimal: {
                x: 50,
                transition: {
                  stiffness: 300,
                  mass: 0.1,
                  type: "spring",
                  damping: 30,
                },
              },
              half: { x: 0, transition: { duration: 0.3 } },
            }}
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
        initial={variant}
        animate={variant}
        custom={{
          clipPath: `path("${minimalPath}")`,
        }}
        variants={{
          default: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
          compact: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
          minimal: {
            opacity: 1,
            x: 36.67,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.3 },
          },
          half: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
        }}
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
  zIndex: 9999,
  userSelect: "none",
  cursor: "pointer",
});

const minimalIslandCss = css({
  position: "absolute",
  top: 0,
  right: 0,
  // backgroundColor: "#000000",
  zIndex: 9999,
  userSelect: "none",
  cursor: "pointer",
});
