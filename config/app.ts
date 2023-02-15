/**
 * 配置网站参数
 */

// 网站地址
export const appUrl: Record<string, string> = {
  // 测试地址
  dev: "http://localhost:8000",
  // 生产地址，可根据实际情况调整
  prod: "https://baidu.com",
};

/**
 * 网站前缀
 * @description 项目部署在非根目录时使用，比如：https://www.xxx.com/app
 */
export const appPrefix: string = ""; // 上述可配置：/app/

/**
 * 网站token
 */
export const appTokenName: string = "APP_TOKEN";

/**
 * 网站重定向地址
 */
export const appRedirectUrl: string = "/basic";
