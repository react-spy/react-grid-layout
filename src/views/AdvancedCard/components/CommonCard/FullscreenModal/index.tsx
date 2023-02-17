import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

interface ModalProps {
  onClose: () => void;
  visible: boolean;
}

const FullscreenModal = ({
  onClose,
  visible,
  children,
}: React.PropsWithChildren<ModalProps>) => {
  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="layout-modal-overlay" onClick={onClose}></div>
      <div className="layout-modal">
        <div className="layout-modal-content">{children}</div>
      </div>
    </>,
    document.body
  );
};

export default FullscreenModal;
