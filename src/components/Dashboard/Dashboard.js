import { useNavigate } from "react-router-dom";
import { UserAuthProvider } from "../context/UserContext";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <UserAuthProvider>
        <p>Dashboard</p>
        <p>
          <a href="/grammarly-editor">Grammarly Editor</a>
          <br />
          <a href="/simple-editor">Simple Editor</a>
          <br />
          <a href="/texteditor">Text Editor</a>
        </p>
        <p>
          <a href="/logout">Logout</a>
        </p>
      </UserAuthProvider>
    </>
  );
}

export default Dashboard;
