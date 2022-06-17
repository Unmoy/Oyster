import { AuthProvider } from "./components/context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import AddDetials from "./components/Login/AddDetials";
import Dashboard from "./components/Dashboard/Dashboard";
import GrammarlyEditor from "./components/editors/GrammarlyEditor";
import SimpleEditor from "./components/editors/SimpleEditor";
import TextEditor from "./components/TextEditor/TextEditor";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/addDetails" element={<AddDetials />} />
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/grammarly-editor" element={<GrammarlyEditor />} />
        <Route exact path="/simple-editor" element={<SimpleEditor />} />
        <Route exact path="/texteditor" element={<TextEditor />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
