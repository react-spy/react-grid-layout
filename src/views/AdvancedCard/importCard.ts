import { lazy } from "react";
import type { Item } from "@/typing/index";

const BasicInfoCard = lazy(() => import("./components/BasicInfoCard"));

/**
 * 映射卡片组件
 */
export const componentsMap: Record<string, any> = {
  BasicInfoCard,
};

/**
 * uuid和type之间的映射
 */
export const uuidTypeMap: Record<string, string> = {
  EcxWFWmS: "BasicInfoCard",
  T1h13Etq: "BasicInfoCard",
};

export const initLayout: Item[] = [
  {
    x: 0,
    y: 0,
    w: 2,
    h: 6,
    i: "EcxWFWmS",
  },
  {
    x: 0,
    y: 0,
    w: 2,
    h: 6,
    i: "T1h13Etq",
  },
];
