import React, { useId, useRef } from "react";
import { Form } from "react-router-dom";
import TechnologyName from "../pages/admin/technology/TechnologyName";
import { useSelector } from "react-redux";

function TechnologyModal({
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  const idRef = useRef();
  const technologyNameRef = useRef();
  const descriptionRef = useRef();

  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

  function submitHandler() {
    modalSubmitHandler(
      idRef.current.value,
      technologyNameRef.current.value,
      descriptionRef.current.value
    );
    modalCancelHandler(false);
  }

  return (
    <div className="technologyModal">
      <form className="technologyModal-form">
        <fieldset className="technologyModal-form-group">
          <legend>
            {modalData?.TechnologyID
              ? "Edit Technology"
              : "Create New Technology"}
          </legend>
          <span className="technologyModal-form-id">
            ID
            <input ref={idRef} value={modalData?.TechnologyID || id} disabled />
          </span>
          <TechnologyName
            technologyName={modalData?.TechnologyName}
            ref={technologyNameRef}
          />
          <div className="technologyModal-form-input">
            <label>Description</label>
            <textarea
              defaultValue={modalData.Description}
              ref={descriptionRef}
              type="text"
            />
          </div>
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
              {modalData?.TechnologyID ? "Edit" : "Add"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default TechnologyModal;
