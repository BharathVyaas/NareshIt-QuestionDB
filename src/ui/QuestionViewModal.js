import React, { useId } from "react";

function QuestionViewModal({ modalData, cancelHandler, submitHandler }) {
  const id = useId();

  let content = <ContentHelperEdit modalData={modalData} />;

  if (modalData.type === "view")
    content = <ContentHelperView modalData={modalData} />;

  return content;
}

export default QuestionViewModal;

function ContentHelperEdit() {
  return (
    <div className="questionviewmodal hide-scroll">
      <section className="font-medium text-xl mb-8">
        <div className="flex justify-between border-b-2 border-gray-300 mb-4 relative">
          <h1 className="text-2xl inline-block">
            Question {modalData?.question?.QuestionID}
          </h1>

          <p className="absolute bottom-0 right-0 font-normal text-sm inline-block">
            Difficulty: {1}
          </p>
        </div>
        <article>
          <h2 className=" text-lg font-semibold mb-2 ">Question:</h2>
          <p className="mb-4 pl-3">{modalData?.question?.Question}</p>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Options:</h2>
          <ul className="pl-3 text-lg">
            <li className="">{modalData?.question?.OptionA}</li>
            <li className="">{modalData?.question?.OptionB}</li>
            <li className="">{modalData?.question?.OptionC}</li>
            <li className="">{modalData?.question?.OptionD}</li>
          </ul>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p className="pl-3 text-lg">{modalData?.question?.CorrectAnswer}</p>
        </article>
      </section>
    </div>
  );
}

function ContentHelperView({ modalData }) {
  return (
    <div className="questionviewmodal hide-scroll">
      <section className="font-medium text-xl mb-8">
        <div className="flex justify-between border-b-2 border-gray-300 mb-4 relative">
          <h1 className="text-2xl inline-block">
            Question {modalData?.question?.QuestionID}
          </h1>

          <p className="absolute bottom-0 right-0 font-normal text-sm inline-block">
            Difficulty: {1}
          </p>
        </div>
        <article>
          <h2 className=" text-lg font-semibold mb-2 ">Question:</h2>
          <p className="mb-4 pl-3">{modalData?.question?.Question}</p>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Options:</h2>
          <ul className="pl-3 text-lg">
            <li className="">{modalData?.question?.OptionA}</li>
            <li className="">{modalData?.question?.OptionB}</li>
            <li className="">{modalData?.question?.OptionC}</li>
            <li className="">{modalData?.question?.OptionD}</li>
          </ul>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p className="pl-3 text-lg">{modalData?.question?.CorrectAnswer}</p>
        </article>
      </section>
    </div>
  );
}

/**(
    <div className="technologyModal">
      <form className="technologyModal-form">
        <fieldset className="technologyModal-form-group">
          <legend>
            {modalData?.QuestionID ? "Edit Question" : "Create New Question"}
          </legend>
          <span className="technologyModal-form-id">
            ID
            <input value={modalData?.TechnologyID || id} disabled />
          </span>

          <div className="technologyModal-form-input">
            <label>Description</label>
            <textarea defaultValue={modalData?.Description} type="text" />
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
    </div> */
