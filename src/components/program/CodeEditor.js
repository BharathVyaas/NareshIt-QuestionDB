import Editor from "@monaco-editor/react";
import { useRef } from "react";

function CodeEditor({ state, dispatcher }) {
  const editorRef = useRef(null);

  // For editor
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const onValueChange = (e) => {
    dispatcher({ type: "code", payload: e });
  };

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
        onChange={onValueChange}
        defaultValue={state.data.code}
      />
    </>
  );
}

export default CodeEditor;
