/**
 * 自定义首页--Hover操作
 */
import { Suspense } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSetState } from "ahooks";
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
          [`${index}`]: (
            <div className={styles.card}>
              <div>卡片{index + 1}</div>
            </div>
          ),
        }
      ),
    {}
  );

const generateLayout = Array.from({ length: 6 })
  .fill(0)
  .map((_, i: number) => ({
    x: 0,
    y: 0,
    w: 2,
    h: 3,
    i: i.toString(),
  }));

const BasicCard = () => {
  const [state, setState] = useSetState<any>({
    appLayoutList: generateLayout,
  });
  const { appLayoutList } = state;

  const renderGridItem = (item: Item) => {
    const { i } = item;
    return (
      <div
        key={i}
        onMouseOver={() => setState({ [`${i}_isHoving`]: true })}
        onMouseOut={() => setState({ [`${i}_isHoving`]: false })}
      >
        <Suspense fallback={<div>loading</div>}>{componentsMap[i]}</Suspense>
      </div>
    );
  };

  const dealLayout = appLayoutList.map((item: Item) => ({
    ...item,
    isDraggable: !!state[`${item.i}_isHoving`],
    isResizable: !!state[`${item.i}_isHoving`],
  }));

  return (
    <div>
      <ResponsiveGridLayout
        className="layout"
        compactType="vertical"
        margin={[10, 10]}
        containerPadding={[0, 0]}
        // 一行显示几列
        cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
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
export default BasicCard;
