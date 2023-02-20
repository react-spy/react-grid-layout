import React from "react";
import ReactDOM from "react-dom";
import cls from "classnames";
import { useControllableValue } from "ahooks";
import { FullscreenExitOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

interface ModalProps {
  setVisible: (v: boolean) => void;
  visible: boolean;
  title?: string;
}

const FullscreenModal = (props: React.PropsWithChildren<ModalProps>) => {
  const { children, title } = props;

  const [visible, setVisible] = useControllableValue(props, {
    valuePropName: "visible",
    trigger: "setVisible",
  });

  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles["layout-modal-overlay"]}></div>
      <div
        className={cls({
          [styles["layout-modal"]]: true,
          [styles["zoomIn"]]: visible,
        })}
      >
        <div className={styles["layout-modal-header"]}>
          <div className={styles["layout-modal-header-title"]}>{title}</div>
          <div
            className={styles["layout-modal-header-tool"]}
            onClick={() => setVisible(false)}
          >
            <FullscreenExitOutlined />
            <span>退出全屏</span>
          </div>
        </div>
        <div className={styles["layout-modal-content"]}>{children}</div>
      </div>
    </>,
    document.body
  );
};

export default FullscreenModal;
