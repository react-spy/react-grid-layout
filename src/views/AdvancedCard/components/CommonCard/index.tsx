/**
 * 公共卡片组件
 */
import React, { useContext } from "react";
// import type { MutableRefObject } from "react";
import { Space, Tooltip, Dropdown, message } from "antd";
import { useSetState } from "ahooks";
import { FullscreenOutlined, EllipsisOutlined } from "@ant-design/icons";
import { CustomCardHomeContext } from "../../index";
import FullscreenModal from "./FullscreenModal";
import styles from "./index.module.less";

export type CommonCardProps = {
  // actionRef?: MutableRefObject<{ title: string; reload: () => void } | null>;
  title: string;
  reload: () => void;
};

const CommonCard = ({
  children,
  title = "卡片标题",
  reload,
}: React.PropsWithChildren<CommonCardProps>) => {
  const { isDragResizable, setCardState } = useContext(CustomCardHomeContext);

  const [state, setState] = useSetState({
    visible: false,
  });
  const { visible } = state;

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof reload === "function") {
              reload();
            }
          }}
        >
          刷新数据
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            message.info("仅演示!");
          }}
        >
          编辑
        </a>
      ),
    },
  ];

  const renderUnEditTool = (
    <Space size="middle">
      <Tooltip title="全屏">
        <FullscreenOutlined
          className={styles["card-tool-icons"]}
          onClick={() => {
            setState({ visible: true });
            setCardState({ isDragResizable: false });
          }}
        />
      </Tooltip>
      <Dropdown menu={{ items }}>
        <EllipsisOutlined className={styles["card-tool-more-icon"]} />
      </Dropdown>
    </Space>
  );
  return (
    <div className={styles["card"]}>
      <div className={styles["card-wrap"]}>
        <div className={styles["card-header"]}>
          <span>{title}</span>
          <span>{renderUnEditTool}</span>
        </div>
        <div className={styles["card-content"]}>
          {children}
          <div className={isDragResizable ? styles.disabledLayer : ""} />
        </div>
      </div>
      <FullscreenModal
        title={title}
        visible={visible}
        setVisible={(v) => {
          if (!v) {
            setCardState({ isDragResizable: true });
          }
          setState({ visible: v });
        }}
      >
        {children}
      </FullscreenModal>
    </div>
  );
};
export default CommonCard;
