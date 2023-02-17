/**
 * 公共卡片组件
 */
import React from "react";
import styles from "./index.module.less";
type CommonCardProps = {
  disabledLayer?: React.ReactNode;
};

const CommonCard = ({
  children,
  disabledLayer = <></>,
}: React.PropsWithChildren<CommonCardProps>) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card-wrap"]}>
        <div className={styles["card-header"]}>卡片标题</div>
        <div className={styles["card-content"]}>
          {children}
          {disabledLayer}
        </div>
      </div>
    </div>
  );
};
export default CommonCard;
