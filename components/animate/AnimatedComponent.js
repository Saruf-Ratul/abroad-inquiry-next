"use client";

import { m } from "framer-motion";
import { varFade } from "./variants";

const AnimatedComponent = ({ animationType, children, ...props }) => {
  const animationVariants = varFade(props);

  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants[animationType]}
    >
      {children}
    </m.div>
  );
};

export default AnimatedComponent;
