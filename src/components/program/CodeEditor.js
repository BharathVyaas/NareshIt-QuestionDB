/* import { useRef, useState } from "react";
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
//
//* @param {number[]} input
//* @returns {number} 
//
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

function CodeEditor({state, dispatcher}) {
  const [technology, setTechnology] = useState("c");
  const editorRef = useRef(null);
  const file = technologies[technology];

  const [output, setOutput] = useState([]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function getOutput() {
    let input = editorRef.current.getValue()

    if(technology === 'javascript'){
      input += ` console.log(sum( 1, 2 ))`
    }

    try {
      const res = await axios.get("http://localhost:4000/program/compile", {
        params: {
          input,
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

export default CodeEditor;
 */

import Editor from '@monaco-editor/react'
import { useEffect, useRef } from 'react';
import { Observable } from '../../services/Observer';
import axios from 'axios'


const getCodeFromEditor = (ref) => {
    return ref.current.getValue()
}

const getOutput = async (technology, userCode) => {
    try {
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
  
        if (typeof output === "string") output = output
        if (typeof output === "number") output = output
        if (typeof output === "object") output = JSON.stringify(output)
          
        return output
      } catch (err) {
        console.error(err);
      }
}

const getValidator = (state) => {
    let input = ''

    state.input.forEach((item, index) => {
        input += item
        if(index + 1 < state.input.length)
        input += ','
    })

    return 'console.log(' + state.data._validatorFunction + '(' + input + '))'
}

function CodeEditor ({state, dispatcher}) {
    const editorRef = useRef(null);

    // For editor
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor
    }

    /** 
     * 
     * Subsecribe to RunInput event which will be triggered when user clicked on Run Input
     * on InputOutputSection Component
     * 
     */ 
    useEffect( () => {
    Observable.subescribe({key: 'codeEditor', eventType: 'runInput', update: async() => {
        // update state
        const userCode = getCodeFromEditor(editorRef)
        dispatcher({type:'code',payload: userCode})

        dispatcher({type: 'loading', payload: true})

        // compile code
        const output = await getOutput(state.data.technology, userCode + getValidator(state))

        dispatcher({type: 'loading', payload: false})
        dispatcher({type: 'output',payload: output})
    }})}, [])

    return <><Editor
    height="60vh"
    width="80%"
    theme="vs-dark"
    onMount={handleEditorDidMount}
    path={state.data.path}
    defaultLanguage={state.data.technology}
    language={state.data.technology}
    defaultValue={state.data.code}
  /></>
}

export default CodeEditor