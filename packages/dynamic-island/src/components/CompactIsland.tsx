import { css } from "@emotion/react";
import { getSvgPath } from "figma-squircle";
import { motion } from "framer-motion";
import { sizeMap } from "../constant";

type CompactIslandProps = {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export function CompactIsland({ leading, trailing }: CompactIslandProps) {
  return (
    <motion.div
      initial={{
        width: sizeMap.default.width,
        height: sizeMap.default.height,
        clipPath: `path("${getSvgPath(sizeMap.default)}")`,
      }}
      animate={{
        width: sizeMap.compact.width,
        height: sizeMap.compact.height,
        clipPath: `path("${getSvgPath(sizeMap.compact)}")`,
      }}
      exit={{
        width: sizeMap.default.width,
        height: sizeMap.default.height,
        clipPath: `path("${getSvgPath(sizeMap.default)}")`,
      }}
      css={compactIslandCss}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ width: "100%", maxWidth: 62.33, height: 36.67 }}
      >
        {leading}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ width: "100%", maxWidth: 62.33, height: 36.67 }}
      >
        {trailing}
      </motion.div>
    </motion.div>
  );
}
const compactIslandCss = css({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#000",
  overflow: "hidden",
});
