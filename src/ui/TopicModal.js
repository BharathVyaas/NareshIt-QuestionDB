import React, { useId, useRef } from "react";
import { Form } from "react-router-dom";
import TechnologyName from "../pages/admin/technology/TechnologyName";
import { useSelector } from "react-redux";
import ModuleName from "../pages/admin/module/ModuleName";
import TopicName from "../pages/admin/topic/TopicName";

function TopicModal({ modalSubmitHandler, modalCancelHandler }) {
  const idRef = useRef();
  const topicRef = useRef();
  const descriptionRef = useRef();

  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

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
            <input ref={idRef} value={id} disabled />
          </span>
          <TopicName ref={topicRef} />
          <div className="technologyModal-form-input">
            <label>Description</label>
            <textarea ref={descriptionRef} type="text" />
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
