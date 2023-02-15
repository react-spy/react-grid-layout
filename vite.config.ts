import type { ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createViteResolve } from "./config/vite/resolve";
import { createViteServer } from "./config/vite/server";
import { createViteDefine } from "./config/vite/define";

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfig => {
  return {
    // base: "/myapp",
    plugins: [react()],
    // 解析配置
    resolve: createViteResolve(__dirname),
    // 配置服务器
    server: createViteServer(),
    // 定义全局常量
    define: createViteDefine(),
  };
};
