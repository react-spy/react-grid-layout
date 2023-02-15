import type { ServerOptions, ProxyOptions } from "vite";
import proxy from "../proxy";

type myServerOptions = ServerOptions & { proxy?: ProxyOptions };

export function createViteServer(): myServerOptions {
  let { BUILD_ENV } = process.env;
  if (!BUILD_ENV) BUILD_ENV = "dev";

  const viteServer: myServerOptions = {
    // 配置代理
    proxy: proxy[BUILD_ENV],
    // 配置端口
    port: 8000,
  };

  return viteServer;
}
