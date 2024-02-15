import { Modal } from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function ModalUi({
  ModalParam,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.38 } }}
      onClick={() => modalCancelHandler(false)}
      className="backdrop"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {
          <ModalParam
            modalData={modalData}
            modalSubmitHandler={modalSubmitHandler}
            modalCancelHandler={modalCancelHandler}
          />
        }
      </div>
    </motion.div>,
    document.getElementById("modal")
  );
}

export default ModalUi;
