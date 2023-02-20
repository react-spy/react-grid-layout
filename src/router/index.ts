/**
 * 路由配置  import { RouteObject } from "react-router-dom";
 * @description https://reactrouter.com/en/main/routers/router-provider
 * @description elementPath 用于渲染的 React 组件路径
 */
import type { RouteObject } from "react-router-dom";
export const baseRouters: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "home",
        id: "./views/Home/index.tsx",
      },
      {
        path: "basic",
        id: "./views/BasicCard/index.tsx",
      },
      {
        path: "delete",
        id: "./views/DeleteCard/index.tsx",
      },
      {
        path: "hover",
        id: "./views/HoverCard/index.tsx",
      },
      {
        path: "adaptive",
        id: "./views/AdaptiveCard/index.tsx",
      },
      {
        path: "drag",
        id: "./views/DraggableResizableCard/index.tsx",
      },
      {
        path: "advanced",
        id: "./views/AdvancedCard/index.tsx",
      },
    ],
  },
  {
    path: "/user/login",
    id: "./views/Login/index.tsx",
  },
];
