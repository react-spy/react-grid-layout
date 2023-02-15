/**
 * 自定义首页--可删除、可添加
 */
import { Suspense } from "react";
import { useSetState } from "ahooks";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Item } from "@/typing/index";
import { insertCard } from "@/utils/utils";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./index.module.less";
import "./index.less";

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

const generateCardWidth = () => {
  const arr = [1, 2, 3];
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const generateLayout = Array.from({ length: 6 })
  .fill(0)
  .map((_, i: number) => ({
    x: 0,
    y: 0,
    w: generateCardWidth(),
    h: 4,
    i: i.toString(),
  }));

const ToolBox = ({ items = [], onTakeItem = (k: Item) => {} }) => {
  return (
    <div className="toolbox">
      <div className="toolbox__items">
        {items.map((item: any) => (
          <div
            key={item.i}
            className="toolbox__items__item"
            onClick={() => onTakeItem(item)}
          >
            卡片{Number(item.i) + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const DeleteCard = () => {
  const [state, setState] = useSetState<any>({
    appLayoutList: generateLayout,
    toolbox: { lg: [] },
    currentBreakpoint: "lg",
  });
  const { appLayoutList, toolbox, currentBreakpoint } = state;

  const renderGridItem = (item: Item) => {
    const { i } = item;
    return (
      <div key={i}>
        <Suspense fallback={<div>loading</div>}>
          <div className="hide-button" onClick={() => onPutItem(item)}>
            &times;
          </div>
          {componentsMap[i]}
        </Suspense>
      </div>
    );
  };

  const dealLayout = appLayoutList.map((item: Item, index: number) => ({
    ...item,
    // isDraggable: false,
    // isResizable: false,
  }));

  const onBreakpointChange = (breakpoint: string) => {
    setState({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...toolbox,
        [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
      },
    });
  };

  const onTakeItem = (item: Item) => {
    setState({
      toolbox: {
        ...toolbox,
        [currentBreakpoint]: toolbox[currentBreakpoint].filter(
          ({ i }: Item) => i !== item.i
        ),
      },
      appLayoutList: insertCard(appLayoutList, item),
    });
  };

  const onPutItem = (item: Item) => {
    setState({
      toolbox: {
        ...toolbox,
        [currentBreakpoint]: [...toolbox[currentBreakpoint], item],
      },
      appLayoutList: appLayoutList.filter(({ i }: any) => i !== item.i),
    });
  };

  return (
    <div>
      <ToolBox
        items={toolbox[currentBreakpoint] || []}
        onTakeItem={onTakeItem}
      />
      <ResponsiveGridLayout
        className="layout"
        compactType="vertical"
        margin={[10, 10]}
        containerPadding={[0, 0]}
        // 一行显示几列
        cols={{ lg: 4, md: 4, sm: 2, xs: 1 }}
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
        useCSSTransforms={false}
        measureBeforeMount={false}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={(_layout: any, layouts: any) => {
          console.log();
          setState({ appLayoutList: layouts[currentBreakpoint] });
        }}
      >
        {dealLayout.map(renderGridItem)}
      </ResponsiveGridLayout>
    </div>
  );
};
export default DeleteCard;
