/**
 * 自定义卡片--企业级
 */
import { Suspense, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSetState } from "ahooks";
import cls from "classnames";
import { componentsMap, initLayout } from "./importCard";
import type { Item } from "@/typing/index";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CommonCard from "./components/CommonCard";
import styles from "./index.module.less";

const ResponsiveGridLayout = WidthProvider(Responsive);

const CustomHome = () => {
  const [state, setState] = useSetState<{
    appLayoutList: Item[];
    isDragResizable: boolean;
  }>({
    appLayoutList: initLayout,
    isDragResizable: true,
  });
  const { appLayoutList, isDragResizable } = state;

  const renderGridItem = (item: Item) => {
    const { i, isDraggable } = item;
    const CardComponent = componentsMap[i];
    return (
      <div key={i} className={cls({ [styles.move]: isDraggable })}>
        <Suspense fallback={<div>loading</div>}>
          <CommonCard
            disabledLayer={
              <div className={isDraggable ? styles.disabledLayer : ""} />
            }
          >
            <CardComponent />
          </CommonCard>
        </Suspense>
      </div>
    );
  };

  const dealLayout = useMemo(
    () =>
      appLayoutList.map((item: Item) => ({
        ...item,
        isDraggable: isDragResizable,
        isResizable: isDragResizable,
      })),
    [appLayoutList, isDragResizable]
  );

  return (
    <div className={styles.container}>
      <ResponsiveGridLayout
        className="layout"
        compactType="vertical"
        margin={[10, 10]}
        containerPadding={[0, 0]}
        // 一行显示几列
        cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
        rowHeight={20}
        isBounded
        maxRows={100}
        layouts={{
          lg: dealLayout,
          md: dealLayout,
          sm: dealLayout,
          xs: dealLayout,
          xxs: dealLayout,
        }}
        preventCollision={false}
        measureBeforeMount={false}
        onLayoutChange={(_layout: any, { lg }: any) =>
          setState({ appLayoutList: lg })
        }
      >
        {dealLayout.map(renderGridItem)}
      </ResponsiveGridLayout>
    </div>
  );
};
export default CustomHome;
