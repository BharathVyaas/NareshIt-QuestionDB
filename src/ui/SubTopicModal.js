import React, { useId, useRef } from "react";
import { Form } from "react-router-dom";
import TechnologyName from "../pages/admin/technology/TechnologyName";
import { useSelector } from "react-redux";
import ModuleName from "../pages/admin/module/ModuleName";
import TopicName from "../pages/admin/topic/TopicName";
import SubTopicName from "../pages/admin/subtopic/SubTopicName";

function SubTopicModal({ modalSubmitHandler, modalCancelHandler }) {
  const idRef = useRef();
  const topicRef = useRef();
  const subTopicRef = useRef();

  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

  function submitHandler() {
    modalSubmitHandler(
      idRef.current.value,
      topicRef.current.value,
      subTopicRef.current.value
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
            <input ref={idRef} value={id} disabled />
          </span>
          <TopicName ref={topicRef} />
          <SubTopicName ref={subTopicRef} />
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

export default SubTopicModal;
