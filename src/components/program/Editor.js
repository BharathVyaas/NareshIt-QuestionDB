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

function Editor() {
  const initialState = {
    data: {
<<<<<<< HEAD
      code: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        // Create a Scanner object to read input from System.in
        Scanner scanner = new Scanner(System.in);

        // Check if an argument is provided
        if (args.length > 0) {
            // Parse the argument as an integer
            int n = Integer.parseInt(args[0]);
            
            // Generate and print the Fibonacci series
            for (int i = 0; i < n; i++) {
                System.out.print(fibonacci(i) + " ");
            }
        } else {
            // Prompt the user to provide the number of terms
            int n = scanner.nextInt();
            
            // Generate and print the Fibonacci series
            for (int i = 0; i < n; i++) {
                System.out.print(fibonacci(i) + " ");
            }
        }
        
        // Close the scanner to release resources
        scanner.close();
    }
    
    // Function to calculate the nth Fibonacci number
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
           
`,
      input: "5",
      output: "",
      expectedOutput: "0 1 1 2 3",
      _validatorFunction: "fibonacci",
      _validatorStart: "",
      _validatorEnd: "",
      technology: "java",
      path: "index.java",
=======
      code: ``,
      _validatorFunction: "sum",
      _validatorStart: "",
      _validatorEnd: "",
      technology: "javascript",
      path: "index.js",
>>>>>>> 20e2db18fc4aceb70cfc3ddfce21f0178411ae7b
    },
    input: [],
    output: undefined,
    error: null,
    loading: false,
<<<<<<< HEAD
  };
=======
  },
  java: {
    data: {
      code: ``,
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
      code: ``,
      _validatorFunction: "",
      _validatorStart: ``,
      technology: "c",
      path: "main.c",
    },
    input: [],
    output: null,
    error: null,
    loading: false,
  },python: {
    data: {
      code: ``,
      _validatorFunction: "sum",
      _validatorStart: ``,
      _validatorEnd: ``,
      technology: "python",
      path: "main.py",
    },
    input: [],
    output: null,
    error: null,
    loading: false,
  }
};

function Editor() {
  const type = "python";

  const initialState = obj[type];

  if (!initialState) throw new Error("Must enter valid type");
>>>>>>> 20e2db18fc4aceb70cfc3ddfce21f0178411ae7b

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
