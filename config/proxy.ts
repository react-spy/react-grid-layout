/**
 * 配置代理
 */
export default {
  dev: {
    "/api": {
      target: "http://xxxx.com",
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
  },
};
