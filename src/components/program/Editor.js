import { useRef, useState } from "react";
import axios from "axios";
import { Editor as Editor_ } from "@monaco-editor/react";

// technology names should be in lowercase
const technologies = {
  c: {
    name: "index.c",
    language: "c",
    value: "//  This is C code.",
  },
  javascript: {
    name: "index.js",
    language: "javascript",
    value: `
/**
* @param {number[]} input
* @returns {number} 
*/
function sum(x, y){
// Your code goes here.

}`,
  },
  java: {
    name: "index.java",
    language: "java",
    value: "//  This is Java code.",
  },
};

function Editor() {
  const [technology, setTechnology] = useState("c");
  const editorRef = useRef(null);
  const file = technologies[technology];

  const [output, setOutput] = useState([]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function getOutput() {
    try {
      const res = await axios.get("http://localhost:4000/program/compile", {
        params: {
          input: editorRef.current.getValue(),
          type: technology,
        },
      });

      console.log(
        "url",
        "http://localhost:4000/program/compile\n",
        "data",
        {
          input: editorRef.current.getValue(),
          type: technology,
        },
        "\nres",
        res
      );

      const output = res.data;

      if (typeof output === "string") setOutput(output.split("\\n"));
      if (typeof output === "number") setOutput([output]);
      if (typeof output === "object") setOutput(JSON.stringify(output));
    } catch (err) {
      console.error(err);
      setOutput(["error compiling code"]);
    }
  }

  return (
    <div>
      <div>
        <div>
          <select
            onChange={(e) => setTechnology(e.target.value)}
            defaultValue="c"
          >
            <option value="c">C</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>
      <div>
        <Editor_
          height="60vh"
          width="80%"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={file?.name}
          defaultLanguage={file?.language}
          language={file?.language}
          defaultValue={file?.value}
        />
      </div>
      <div>
        {output.map((line) => (
          <pre key={Math.random().toString()}>{line}</pre>
        ))}
      </div>

      <button onClick={getOutput}>Test</button>
    </div>
  );
}

export default Editor;
