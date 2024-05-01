import { css } from "@emotion/react";
import { getSvgPath } from "figma-squircle";
import { motion } from "framer-motion";
import { sizeMap } from "../constant";

type ExpandIslandProps = {
  children: React.ReactNode;
};

export function ExpandedIsland({ children }: ExpandIslandProps) {
  return (
    <motion.div
      initial={{
        width: sizeMap.default.width,
        height: sizeMap.default.height,
        clipPath: `path("${getSvgPath(sizeMap.default)}")`,
      }}
      animate={{
        width: sizeMap.expanded.width,
        height: sizeMap.expanded.height,
        clipPath: `path("${getSvgPath(sizeMap.expanded)}")`,
      }}
      exit={{
        width: sizeMap.default.width,
        height: sizeMap.default.height,
        clipPath: `path("${getSvgPath(sizeMap.default)}")`,
      }}
      css={expandedIslandCss}
    >
      {children}
    </motion.div>
  );
}

const expandedIslandCss = css({
  position: "relative",
  backgroundColor: "#000",
  overflow: "hidden",
});
