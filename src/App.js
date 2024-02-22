import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/admin/home/Home";
import Technologies from "./pages/admin/technology/Technologies";
import Modules from "./pages/admin/module/Modules";
import Subtopics from "./pages/admin/subtopic/Subtopics";
import Topics from "./pages/admin/topic/Topics";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import QuestionView from "./pages/admin/questionView/QuestionView";
import GroupQuestionView from "./pages/admin/groupQuestionView/GroupQuestionView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home></Home>} />
          <Route
            path="/technologies"
            exact
            element={<Technologies></Technologies>}
          />
          <Route
            path="/modules/:TechnologyID"
            exact
            element={<Modules></Modules>}
          />
          <Route
            path="/subtopics/:TopicID"
            exact
            element={<Subtopics></Subtopics>}
          />
          <Route path="/topics/:ModuleID" exact element={<Topics></Topics>} />
          <Route
            path="/question-view/:SubTopicID"
            exact
            element={<QuestionView />}
          />
          <Route
            path="/group-question-view/"
            exact
            element={<GroupQuestionView />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
