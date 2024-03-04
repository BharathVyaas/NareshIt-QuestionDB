import Editor from "../../../components/program/Editor";
import Sidebar from "../../../components/program/Sidebar";

function Program() {
  return (
    <div>
    <div className="absolute top-0 left-[35%] w-[70%]">
      <Editor />
    </div>
    <div className="fixed top-0 left-0 w-[30%] h-[100vh] bg-red-300">
      <Sidebar />
    </div>
    </div>
  );
}

export default Program;
