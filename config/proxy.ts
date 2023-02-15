/**
 * 配置代理
 */
export default {
  dev: {
    "/api": {
      target: "http://139.224.54.218:3000",
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
  },
};
