import dayjs from "dayjs";
import { appUrl, appPrefix, appTokenName, appRedirectUrl } from "../app";

const getJsonString = (value: any) => JSON.stringify(value);

export function createViteDefine(): Record<string, any> {
  let { BUILD_ENV } = process.env;
  if (!BUILD_ENV) BUILD_ENV = "dev";

  const buildTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(buildTime);

  const viteDefine: Record<string, any> = {
    // 定义全局常量,定义的变量需要用JSON.stringify包裹

    // 网站相关
    __APP_URL__: getJsonString(appUrl[BUILD_ENV]),
    __APP_PREFIX__: getJsonString(appPrefix),
    __APP_TOKEN_NAME__: getJsonString(appTokenName),
    __APP_REDIRECT_URL__: getJsonString(appRedirectUrl),

    // 构建相关
    __BUILD_ENV__: getJsonString(BUILD_ENV),
    __BUILD_TIME__: getJsonString(buildTime),
  };

  return viteDefine;
}
