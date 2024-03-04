import { Observable } from "../../services/Observer";

  const runInputHandler = () => {
    Observable.notify('runInput', {eventType: 'runInput'})
  }

  const getInput = (state) => {
      return JSON.stringify(state.input).replace('[', '').replace(']', '')
  }

  // must change updateInput to ref instead of onChange use run Input
  const updateInput = (dispatcher, e) => {
    let input = e.target.value

    input = '[' + input + ']'

    console.log(JSON.parse(input))
  }

function InputOutputSection({state, dispatcher}) {
    return (
      <div className="w-[80%] bg-gray-300 p-2 mt-4">
        <div className="flex justify-end pt-3 px-3">
        <button onClick={runInputHandler} className="bg-green-400 px-4 py-1 mx-1">Run Input</button>
        <button onClick={runInputHandler} className="bg-green-400 px-4 py-1 mx-1">Run Input</button></div>
        <div className="flex flex-col px-3">
          <label className="flex justify-between mt-3">
            Your Input:
            <input className="w-[80%]" value={getInput(state)} onChange={() => updateInput(dispatcher, e)} />
          </label><label className="flex justify-between my-3">
            Output:
            <input  className="w-[80%]" value={state.output || ''} onChange={() => {}} />
          </label>
        </div>
      </div>
    );
  }
  
  export default InputOutputSection;
  