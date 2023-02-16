/**
 * 自定义首页--自适应
 */
import { useState, Suspense, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Item } from "@/typing/index";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./index.module.less";

const ResponsiveGridLayout = WidthProvider(Responsive);

const componentsMap: Record<string, any> = Array.from({ length: 6 })
  .fill(0)
  .reduce(
    (prev: Record<string, any>, curr: any, index: number) =>
      Object.assign(
        { ...prev },
        {
          [`${index}`]: <div className={styles.card}>卡片{index + 1}</div>,
        }
      ),
    {}
  );

const generateLayout: Item[] = Array.from({ length: 6 })
  .fill(0)
  .map((_, i: number) => ({
    x: i % 4,
    y: 0,
    w: 2,
    h: 2,
    i: i.toString(),
  }));

const AdaptiveCard = () => {
  const [appLayoutList, setAppLayoutList] = useState(() => generateLayout);

  const renderGridItem = (item: Item) => {
    const { i } = item;
    return (
      <div key={i}>
        <Suspense fallback={<div>loading</div>}>{componentsMap[i]}</Suspense>
      </div>
    );
  };

  const dealLayout = useMemo(
    () =>
      appLayoutList.map((item: Item) => ({
        ...item,
        // isDraggable: false,
        // isResizable: false,
      })),
    [appLayoutList]
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
        useCSSTransforms
        measureBeforeMount={false}
        onLayoutChange={(_layout: any, { lg }: any) => setAppLayoutList(lg)}
      >
        {dealLayout.map(renderGridItem)}
      </ResponsiveGridLayout>
    </div>
  );
};
export default AdaptiveCard;
