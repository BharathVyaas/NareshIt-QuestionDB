import React, { useId, useRef } from "react";
import { Form } from "react-router-dom";
import TechnologyName from "../pages/admin/technology/TechnologyName";
import { useSelector } from "react-redux";
import ModuleName from "../pages/admin/module/ModuleName";

function ModuleModal({ modalData, modalSubmitHandler, modalCancelHandler }) {
  const idRef = useRef();
  const technologyRef = useRef();
  const moduleRef = useRef();

  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

  function submitHandler() {
    modalSubmitHandler(
      idRef.current.value,
      technologyRef.current.value,
      moduleRef.current.value
    );
    modalCancelHandler(false);
  }

  return (
    <div className="technologyModal">
      <form className="technologyModal-form">
        <fieldset className="technologyModal-form-group">
          <legend>Create New Module</legend>
          <span className="technologyModal-form-id">
            ID
            <input ref={idRef} value={modalData.ModuleID || id} disabled />
          </span>
          <TechnologyName
            ref={technologyRef}
            technologyId={modalData?.TechnologyID}
          />
          <ModuleName ref={moduleRef} modalData={modalData} />
          <div className="technologyModal-form-button">
            <button
              onClick={cancelHandler}
              className="technologyModal-form-cancel"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className="technologyModal-form-submit"
            >
              Add
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ModuleModal;
