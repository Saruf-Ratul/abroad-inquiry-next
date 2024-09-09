import { CollapseDrawerContext } from "@/contexts/CollapseDrawerContext";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
