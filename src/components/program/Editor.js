import { useEffect, useReducer } from "react";
import CodeEditor from "./CodeEditor";
import InputOutputSection from "./InputOutputSection";
import TestCaseTable from "./TestCaseTable";

const reducer = (state, action) => {
  switch (action.type) {
    case "code": {
      return { ...state, data: { ...state.data, code: action.payload } };
    }
    case "technology": {
      return { ...state, data: { ...state.data, technology: action.payload } };
    }
    case "input": {
      return { ...state, input: action.payload };
    }
    case "output": {
      return { ...state, output: action.payload };
    }
    case "error": {
      return { ...state, error: action.payload };
    }
    case "loading": {
      return { ...state, loading: action.payload };
    }
    default: {
      throw new Error("Editor: Invalid case", action.type);
    }
  }
};

const obj = {
  javascript: {
    data: {
      code: `/**
* @param {number[]} input
* @returns {number} 
*/
function sum(x, y){
// Your code goes here.

}`,
      _validatorFunction: "sum",
      _validatorStart: "console.log(sum(",
      _validatorEnd: "))",
      technology: "javascript",
      path: "index.js",
    },
    input: [],
    output: undefined,
    error: null,
    loading: false,
  },
  java: {
    data: {
      code: `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, world!");
        }
    }
    
`,
      _validatorFunction: "sum",
      _validatorStart: ``,
      _validatorEnd: ``,
      technology: "java",
      path: "Main.java",
    },
    input: [],
    output: null,
    error: null,
    loading: false,
  },
  c: {
    data: {
      code: `#include <stdio.h>
  
int sum(int x, int y) {
  
}    
      
  
`,
      _validatorFunction: "sum",
      _validatorStart: `
int main() {printf("%d",sum(`,
      _validatorEnd: `));return 0;
}`,
      technology: "c",
      path: "main.c",
    },
    input: [],
    output: null,
    error: null,
    loading: false,
  },
};

function Editor() {
  const type = "java";

  const initialState = obj[type];

  if (!initialState) throw new Error("Must enter valid type");

  // stores all information regarding this page
  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("stateChange", state);
  }, [state]);

  return (
    <div>
      <div>
        {/**  Monaco Code Editor */}
        <CodeEditor state={state} dispatcher={dispatcher} />
      </div>
      <div>
        <InputOutputSection state={state} dispatcher={dispatcher} />
      </div>
      <div>
        <TestCaseTable state={state} dispatcher={dispatcher} />
      </div>
    </div>
  );
}

export default Editor;
