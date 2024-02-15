import React, { useId, useRef } from "react";
import { Form } from "react-router-dom";
import TechnologyName from "../pages/admin/technology/TechnologyName";
import { useSelector } from "react-redux";
import ModuleName from "../pages/admin/module/ModuleName";
import TopicName from "../pages/admin/topic/TopicName";

function TopicModal({ modalData, modalSubmitHandler, modalCancelHandler }) {
  const idRef = useRef();
  const topicRef = useRef();
  const descriptionRef = useRef();

  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

  console.log("modalData", modalData);

  function submitHandler() {
    modalSubmitHandler(
      idRef.current.value,
      topicRef.current.value,
      descriptionRef.current.value
    );
    modalCancelHandler(false);
  }

  return (
    <div className="technologyModal">
      <form className="technologyModal-form">
        <fieldset className="technologyModal-form-group">
          <legend>Create New Topic</legend>
          <span className="technologyModal-form-id">
            ID
            <input ref={idRef} value={modalData.TopicID || id} disabled />
          </span>
          <TopicName ref={topicRef} modalData={modalData} />
          <div className="technologyModal-form-input">
            <label>Description</label>
            <textarea
              ref={descriptionRef}
              defaultValue={modalData?.Description}
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
              Add
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default TopicModal;
