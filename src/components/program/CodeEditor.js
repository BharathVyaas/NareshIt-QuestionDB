import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { Observable } from "../../services/Observer";
import axios from "axios";

const getCodeFromEditor = (ref) => {
  return ref.current.getValue();
};

const getOutput = async (technology, userCode) => {
  /* try {
    const res = await axios.get("http://localhost:4000/program/compile", {
      params: {
        input: userCode,
        type: technology,
      },
    });

    console.log(
      "url",
      "http://localhost:4000/program/compile\n",
      "data",
      {
        input: userCode,
        type: technology,
      },
      "\nres",
      res
    );

    let output = res.data;

    if (typeof output === "string") output = output;
    if (typeof output === "number") output = output;
    if (typeof output === "object") output = JSON.stringify(output);

    return output;
  } catch (err) {
    console.error(err);
  } */
};

const getValidator = (state) => {
  let input = "";

  state.input.forEach((item, index) => {
    input += item;
    if (index + 1 < state.input.length) input += ",";
  });

  return "console.log(" + state.data._validatorFunction + "(" + input + "))";
};

function CodeEditor({ state, dispatcher }) {
  const editorRef = useRef(null);

  // For editor
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  /**
   *
   * Subsecribe to RunInput event which will be triggered when user clicked on Run Input
   * on InputOutputSection Component
   *
   */
  useEffect(() => {
    Observable.subescribe({
      key: "codeEditor",
      eventType: "runInput",
      update: async () => {
        // update state
        const userCode = getCodeFromEditor(editorRef);
        dispatcher({ type: "code", payload: userCode });
        dispatcher({ type: "loading", payload: true });

        // compile code
        const output = await getOutput(
          state.data.technology,
          userCode + getValidator(state)
        );

        dispatcher({ type: "loading", payload: false });
        dispatcher({ type: "output", payload: output });
      },
    });
  }, []);

  return (
    <>
      <Editor
        height="60vh"
        width="80%"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        path={state.data.path}
        defaultLanguage={state.data.technology}
        language={state.data.technology}
        defaultValue={state.data.code}
      />
    </>
  );
}

export default CodeEditor;
