/**
 * 路由相关
 */
import { lazy, Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "@/layouts";
import { baseRouters } from "@/router";

const modules = import.meta.glob("./views/*/*.tsx");

const createRoutes: any = (routes = baseRouters, parentPath = "") => {
  return routes.reduce((prev, curr: any) => {
    const { id, children, path, ...rest } = curr;

    // 递归处理子路由
    if (Array.isArray(children) && children.length) {
      return createRoutes(children, path);
    }

    let Component;
    if (id && modules[id]) {
      Component = lazy(modules[id] as any);
      return [
        ...prev,
        {
          ...rest,
          path: `${parentPath}${path}`,
          element: (
            <Suspense fallback={<p>loading</p>}>
              <Component />
            </Suspense>
          ),
        },
      ];
    }
    return prev;
  }, []);
};

const initRouters = [
  {
    path: "/",
    element: <Layout />,
    children: createRoutes(),
  },
];

const RouteSetting = () => {
  return <RouterProvider router={createHashRouter(initRouters)} />;
};
export default RouteSetting;
