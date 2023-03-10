/**
 * 自定义卡片--企业级
 */
import { Suspense, createContext } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSetState } from "ahooks";
import cls from "classnames";
import { componentsMap, initLayout, uuidTypeMap } from "./importCard";
import type { Item } from "@/typing/index";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./index.module.less";
import "./index.less";

const ResponsiveGridLayout = WidthProvider(Responsive);

export type CustomCardHomeContextType = {
  isDragResizable: boolean;
  setCardState: (b: any) => void;
};

export const CustomCardHomeContext = createContext<CustomCardHomeContextType>({
  isDragResizable: false,
  setCardState: () => {},
});

const CustomCardHome = () => {
  const [state, setState] = useSetState<{
    appLayoutList: Item[];
    isDragResizable: boolean;
  }>({
    appLayoutList: initLayout,
    isDragResizable: true,
  });
  const { appLayoutList, isDragResizable } = state;

  const renderGridItem = (item: Item) => {
    // 如果想支持多个卡片公用一个模板，需要动态生成uuid和卡片类型type映射
    const { i } = item;
    const type = uuidTypeMap[i];
    if (!type) {
      // 没有找到模板类型
      return null;
    }
    const CardComponent = componentsMap[type];
    // 没有懒加载组件
    if (!CardComponent) return null;
    return (
      <div
        key={i}
        data-card-type={i}
        className={cls({ [styles.move]: isDragResizable })}
      >
        <Suspense fallback={<div>卡片加载中...</div>}>
          <CardComponent />
        </Suspense>
      </div>
    );
  };

  const context: CustomCardHomeContextType = {
    isDragResizable,
    setCardState: setState,
  };

  return (
    <CustomCardHomeContext.Provider value={context}>
      <div className={styles.container}>
        <ResponsiveGridLayout
          className="layout"
          compactType="vertical"
          isDraggable={isDragResizable}
          isResizable={isDragResizable}
          margin={[10, 10]}
          containerPadding={[0, 0]}
          // 一行显示几列
          cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
          rowHeight={20}
          isBounded
          maxRows={100}
          layouts={{
            lg: appLayoutList,
            md: appLayoutList,
            sm: appLayoutList,
            xs: appLayoutList,
            xxs: appLayoutList,
          }}
          preventCollision={false}
          measureBeforeMount={false}
          onLayoutChange={(_layout: any, { lg }: any) =>
            setState({ appLayoutList: lg })
          }
        >
          {appLayoutList.map(renderGridItem)}
        </ResponsiveGridLayout>
      </div>
    </CustomCardHomeContext.Provider>
  );
};
export default CustomCardHome;
