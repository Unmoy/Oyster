import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <p>Dashboard</p>
      <p>
        <a href="/grammarly-editor">Grammarly Editor</a>
        <br/>
        <a href="/simple-editor">Simple Editor</a>
      </p>
    </>
  );
}

export default Dashboard;
