import { usePathname } from "next/navigation";
// @mui
//
import { getActive } from "..";
import { NavItemRoot } from "./NavItem";

// ----------------------------------------------------------------------

export function NavListRoot({ list, isCollapse }) {
  const pathname = usePathname();
  const active = getActive(list.path, pathname);

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------
