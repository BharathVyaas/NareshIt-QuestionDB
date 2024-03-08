import Editor from "@monaco-editor/react";
import { useRef } from "react";

const options = {
  autoIndent: 'full',
  contextmenu: true,
  fontFamily: 'monospace',
  fontSize: 13,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: true,
  },
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: true,
}; 

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
        onMount={handleEditorDidMount}
        path={state.data.path}
        defaultLanguage={state.data.technology}
        options={options}
        language={state.data.technology}
        onChange={onValueChange}
        defaultValue={state.data.code}
      />
    </>
  );
}

export default CodeEditor;
