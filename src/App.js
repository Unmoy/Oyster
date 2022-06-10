import { AuthProvider } from "./components/context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import AddDetials from "./components/Login/AddDetials";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/addDetails" element={<AddDetials />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
