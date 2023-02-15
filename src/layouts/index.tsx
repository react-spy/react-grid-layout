/**
 * 布局
 */

import { Outlet, Navigate, useLocation } from "react-router-dom";
const Layout = () => {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return <Navigate to={__APP_REDIRECT_URL__} />;
  }
  return <Outlet />;
};
export default Layout;
