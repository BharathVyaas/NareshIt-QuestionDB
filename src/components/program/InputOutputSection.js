import { useEffect, useRef } from "react";
import axios from "axios";
import { Observable } from "../../services/Observer";

const getInput = (ref) => {
  let input = ref.current.value;

  // remove , if string ends with it
  if (input.slice(-1) === ",") {
    input = input.slice(0, -1);
  }

  input = "[" + input + "]";

  return JSON.parse(input);
};

const runInputHandler = async (ref, state, dispatcher) => {
  Observable.notify("runInput", { eventType: "runInput" });

  dispatcher({ type: "loading", payload: true });

  const userInput = JSON.stringify(getInput(ref))
    .replace("[", "")
    .replace("]", "");

  const input =
    state.data.code +
    state.data._validatorStart +
    userInput +
    state.data._validatorEnd;

  try {
    const res = await axios.get("http://localhost:4000/program/compile", {
      params: {
        input,
        type: state.data.technology,
      },
    });

    console.log(
      "url",
      "http://localhost:4000/program/compile\n",
      "data",
      {
        input,
        type: state.data.technology,
      },
      "\nres",
      res
    );

    let output = res.data;

    /**
     * ToDO
     * Optimize this
     */
    if (typeof output === "string")
      dispatcher({ type: "output", payload: output });
    if (typeof output === "number")
      dispatcher({ type: "output", payload: output });
    if (typeof output === "object") {
      dispatcher({ type: "output", payload: JSON.stringify(output) });

      Observable.notify("output", {
        eventType: "output",
        payload: JSON.stringify(output),
      });
    } else {
      Observable.notify("output", { eventType: "output", payload: output });
    }
  } catch (err) {
    console.error(err);
    dispatcher({ type: "error", payload: err });
  }

  dispatcher({ type: "loading", payload: false });
};

function InputOutputSection({ state, dispatcher }) {
  const inputRef = useRef();

  // if user pressed on enter while in Input field if input doesn't end with , add , at the end
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (inputRef.current === document.activeElement) {
          if (inputRef.current.value.slice(-1) !== ",") {
            inputRef.current.value += ",";
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="w-[80%] bg-gray-300 p-2 mt-4">
      <div className="flex justify-end pt-3 px-3">
        <button
          onClick={() => runInputHandler(inputRef, state, dispatcher)}
          className="bg-green-400 px-4 py-1 mx-1"
        >
          Execute
        </button>
        <button
          onClick={() => runInputHandler(inputRef, state, dispatcher)}
          className="bg-green-400 px-4 py-1 mx-1"
        >
<<<<<<< HEAD
          Run Test Case
=======
          Execute
>>>>>>> origin/main
        </button>
      </div>
      <div className="flex flex-col px-3">
        <label className="flex justify-between mt-3">
          Your Input:
          <input className="w-[80%]" ref={inputRef} />
        </label>
        <label className="flex justify-between my-3">
          Output:
          <input
            className="w-[80%]"
            value={state.output || ""}
            onChange={() => {}}
          />
        </label>
      </div>
    </div>
  );
}

export default InputOutputSection;
