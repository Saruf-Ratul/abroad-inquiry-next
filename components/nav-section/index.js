// ----------------------------------------------------------------------
export { default as NavSectionHorizontal } from "./horizontal";
export { default as NavSectionVertical } from "./vertical";

export function isExternalLink(path) {
  return path.includes("http");
}

export function getActive(path, pathname) {
  if (path === pathname) {
    return true;
  }
  
  // Check if path is '/dashboard' and pathname is not exactly '/dashboard'
  if (path === '/dashboard' && pathname !== '/dashboard') {
    return false;
  }
  return pathname.startsWith(path);
}
