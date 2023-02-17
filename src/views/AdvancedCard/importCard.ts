import { lazy } from "react";
import type { Item } from "@/typing/index";

const BasicInfoCard = lazy(() => import("./components/BasicInfoCard"));

/**
 * 映射卡片组件
 */
export const componentsMap: Record<string, any> = {
  BasicInfoCard,
};

export const initLayout: Item[] = [
  {
    x: 0,
    y: 0,
    w: 2,
    h: 6,
    i: "BasicInfoCard",
  },
];
