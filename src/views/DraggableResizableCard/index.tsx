/**
 * 自定义首页--是否可拖动、可缩放
 */
import { Suspense, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSetState } from "ahooks";
import { Checkbox, Card, Tooltip } from "antd";
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
              卡片{index + 1}
              <Tooltip title="跳转到百度">
                <a href="https://www.baidu.com">百度一下</a>
              </Tooltip>
            </div>
          ),
        }
      ),
    {}
  );

const generateLayout: Item[] = Array.from({ length: 6 })
  .fill(0)
  .map((_, i: number) => ({
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    i: i.toString(),
  }));

const BasicCard = () => {
  const [state, setState] = useSetState<{
    appLayoutList: Item[];
    dragResizableList: Array<"dragable" | "resizable">;
  }>({
    appLayoutList: generateLayout,
    dragResizableList: [],
  });
  const { appLayoutList, dragResizableList } = state;

  const renderGridItem = (item: Item) => {
    const { i, isDraggable } = item;
    return (
      <div key={i}>
        <Suspense fallback={<div>loading</div>}>
          {componentsMap[i]}
          {isDraggable && <div className={styles.disabledLayer} />}
        </Suspense>
      </div>
    );
  };

  const dealLayout = useMemo(
    () =>
      appLayoutList.map((item: Item) => ({
        ...item,
        isDraggable: dragResizableList.includes("dragable"),
        isResizable: dragResizableList.includes("resizable"),
      })),
    [appLayoutList, dragResizableList]
  );

  return (
    <div>
      <Card>
        <Checkbox.Group
          onChange={(v: any[]) => setState({ dragResizableList: v })}
        >
          <Checkbox key="dragable" value="dragable">
            可拖动
          </Checkbox>
          <Checkbox key="resizable" value="resizable">
            可缩放
          </Checkbox>
        </Checkbox.Group>
      </Card>
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
        useCSSTransforms
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
