/**
 * 首页
 */
import { Card } from "antd";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
  cursor: "pointer",
};

const cardList = [
  {
    title: "基础用法案例",
    url: "/basic",
  },
  {
    title: "新增、删除案例",
    url: "/delete",
  },
  {
    title: "Hover相关案例",
    url: "/hover",
  },
  {
    title: "自适应案例",
    url: "/adaptive",
  },
  {
    title: "拖动、缩放可控制案例",
    url: "/drag",
  },
  {
    title: "企业级实战案例",
    url: "/advanced",
  },
];

const Home = () => {
  return (
    <Card title="React-Grid-Layout案例">
      {cardList.map((item) => (
        <Card.Grid
          key={item.title}
          style={gridStyle}
          onClick={() => {
            const url = item.url.startsWith("/") ? `/#${item.url}` : item.url;
            window.open(url);
          }}
        >
          {item.title}
        </Card.Grid>
      ))}
    </Card>
  );
};
export default Home;
