// next
import NextLink from "next/link";
// @mui

//
import Iconify from "../../Iconify";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";

// ----------------------------------------------------------------------

export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}) {
  const { title, path, icon, info, children } = item;

  return (
    <ListItemStyle component={NextLink} href={path}>
      <ListItemStyle alignItems="center" activeRoot={active}>
        {icon && (
          <ListItemIconStyle isCollapse={isCollapse}>{icon}</ListItemIconStyle>
        )}
        <ListItemTextStyle
          disableTypography
          primary={title}
          isCollapse={isCollapse}
        />
      </ListItemStyle>
    </ListItemStyle>
  );
}
