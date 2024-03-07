import React, { useId, useRef } from "react";
import TechnologyName from "../pages/admin/technology/TechnologyName";
import ModuleName from "../pages/admin/module/ModuleName";
import TopicName from "../pages/admin/topic/TopicName";

function TopicModal({
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  const idRef = useRef();
  const technologyRef = useRef();
  const moduleRef = useRef();
  const topicRef = useRef();
  const descriptionRef = useRef();

  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

  console.log("modalData", flag);

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
          <TechnologyName
            ref={technologyRef}
            flag={flag}
            modalData={modalData}
          />
          <ModuleName ref={moduleRef} flag={flag} modalData={modalData} />
          <TopicName ref={topicRef} flag={flag} modalData={modalData} />
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
