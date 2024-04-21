import { css } from "@emotion/react";
import { type FigmaSquircleParams, getSvgPath } from "figma-squircle";
import { motion, useWillChange } from "framer-motion";
import { DynamicIslandVariant } from "..";

const sizeMap: Record<DynamicIslandVariant, FigmaSquircleParams> = {
  default: { width: 172, height: 36, cornerRadius: 32, cornerSmoothing: 0.6 },
  large: { width: 192, height: 36, cornerRadius: 32, cornerSmoothing: 0.6 },
  xLarge: { width: 366, height: 82, cornerRadius: 50, cornerSmoothing: 0 },
  ultra: { width: 366, height: 200, cornerRadius: 48, cornerSmoothing: 0.6 },
};

export type DynamicIslandProps = {
  variant: DynamicIslandVariant;
  children?: React.ReactNode;
};

export function DynamicIsland({ children, variant }: DynamicIslandProps) {
  const params = sizeMap[variant];
  const svgPath = getSvgPath(params);
  const willChange = useWillChange();
  console.log(svgPath);
  return (
    <motion.div
      initial={false}
      animate={{
        width: params.width,
        height: params.height,
        clipPath: `path("${svgPath}"`,
      }}
      transition={{ stiffness: 400, damping: 30, type: "spring" }}
      css={containerCss}
      style={{
        willChange,
        width: params.width,
        height: params.height,
        borderRadius: params.cornerRadius,
        clipPath: `path("${svgPath}"`,
      }}
    >
      {children}
    </motion.div>
  );
}

const containerCss = css({
  backgroundColor: "black",
  zIndex: 1,
});
