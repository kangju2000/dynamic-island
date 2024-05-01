import { css } from "@emotion/react";
import { getSvgPath } from "figma-squircle";
import { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { sizeMap } from "../constant";

type NotchProps = HTMLMotionProps<"div">;

export function Notch(props: NotchProps) {
  const size = sizeMap["default"];
  const notchPath = getSvgPath(size);
  const { style, ...restProps } = props;

  return (
    <motion.div
      css={notchCss}
      style={{
        width: size.width,
        minWidth: size.width,
        height: size.height,
        clipPath: `path("${notchPath}")`,
        ...style,
      }}
      {...restProps}
    />
  );
}

const notchCss = css({
  backgroundColor: "#000",
});
