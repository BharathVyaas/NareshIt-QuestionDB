import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "question": {
      return { ...state, Question: action.payload };
    }
    case "difficulty": {
      return { ...state, Difficulty: action.payload };
    }
    case "optionA": {
      return { ...state, OptionA: action.payload };
    }
    case "optionB": {
      return { ...state, OptionB: action.payload };
    }
    case "optionC": {
      return { ...state, OptionC: action.payload };
    }
    case "optionD": {
      return { ...state, OptionD: action.payload };
    }
    case "correctAnswer": {
      return { ...state, CorrectAnswer: action.payload };
    }
    default: {
      throw new Error("Must be a valid case QuestionViewModalEdit Reducer");
    }
  }
}

function QuestionViewModalEdit({ modalData, modalSubmitHandler }) {
  console.log(modalData);

  const initialState = {
    Question: modalData?.question?.Question || "",
    Difficulty: modalData?.question?.DifficultyLevelID || "1",
    OptionA: modalData?.question?.OptionA || "",
    OptionB: modalData?.question?.OptionB || "",
    OptionC: modalData?.question?.OptionC || "",
    OptionD: modalData?.question?.OptionD || "",
    CorrectAnswer: modalData?.question?.CorrectAnswer || "",
  };

  const [question, dispatcher] = useReducer(reducer, initialState);

  return (
    <div className="questionviewmodal hide-scroll">
      <section className="font-medium text-xl mb-8">
        <div className="flex justify-between border-b-2 border-gray-300 mb-4 relative">
          <h1 className="text-2xl inline-block">Question</h1>

          <p className="absolute bottom-0 right-0 font-normal text-sm inline-block">
            Difficulty:{" "}
            <select
              value={question.Difficulty}
              onChange={(e) =>
                dispatcher({ type: "difficulty", payload: e.target.value })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </p>
        </div>
        <article className="">
          <h2 className="text-lg font-semibold mb-2 ">Question:</h2>
          <p className="mb-4 pl-3 w-auto">
            <textarea
              className="w-full border border-black text-[.98rem] p-1 rounded"
              placeholder="Your Question"
              value={question.Question}
              onChange={(e) =>
                dispatcher({ type: "question", payload: e.target.value })
              }
            />
          </p>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Options:</h2>
          <ul className="pl-3 text-lg">
            <li className="flex mt-2">
              <input
                type="radio"
                name="option"
                onChange={(e) =>
                  dispatcher({
                    type: "correctAnswer",
                    payload: question.OptionA,
                  })
                }
              />
              <label className="ms-3 w-full">
                <input
                  className="w-full border border-black text-[.98rem] p-1 rounded"
                  type="text"
                  placeholder="Option A"
                  value={question.OptionA}
                  onChange={(e) =>
                    dispatcher({ type: "optionA", payload: e.target.value })
                  }
                />
              </label>
            </li>
            <li className="flex mt-2">
              <input
                type="radio"
                name="option"
                onChange={(e) =>
                  dispatcher({
                    type: "correctAnswer",
                    payload: question.OptionB,
                  })
                }
              />
              <label className="ms-3 w-full">
                <input
                  className="w-full border border-black text-[.98rem] p-1 rounded"
                  type="text"
                  placeholder="Option B"
                  value={question.OptionB}
                  onChange={(e) =>
                    dispatcher({ type: "optionB", payload: e.target.value })
                  }
                />
              </label>
            </li>
            <li className="flex mt-2">
              <input
                type="radio"
                name="option"
                onChange={(e) =>
                  dispatcher({
                    type: "correctAnswer",
                    payload: question.OptionC,
                  })
                }
              />
              <label className="ms-3 w-full">
                <input
                  className="w-full border border-black text-[.98rem] p-1 rounded"
                  type="text"
                  placeholder="Option C"
                  value={question.OptionC}
                  onChange={(e) =>
                    dispatcher({ type: "optionC", payload: e.target.value })
                  }
                />
              </label>
            </li>
            <li className="flex mt-2">
              <input
                type="radio"
                name="option"
                onChange={(e) =>
                  dispatcher({
                    type: "correctAnswer",
                    payload: question.OptionD,
                  })
                }
              />
              <label className="ms-3 w-full">
                <input
                  className="w-full border border-black text-[.98rem] p-1 rounded"
                  type="text"
                  placeholder="Option D"
                  value={question.OptionD}
                  onChange={(e) =>
                    dispatcher({ type: "optionD", payload: e.target.value })
                  }
                />
              </label>
            </li>
          </ul>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p className="pl-3 text-lg">
            {question.CorrectAnswer || "Select One Option"}
          </p>
        </article>
      </section>
      <div className="w-full flex">
        <button
          className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          onClick={() => modalSubmitHandler(question)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuestionViewModalEdit;
