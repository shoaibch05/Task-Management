import Dashboard from "./components/Dashboard";
import People from "./components/People";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Route, Routes } from "react-router";
import CreateBoardModal from "./components/SmallComponents/CreateBoardModal";

function App() {
  const boards = [
    { id: 1, title: "Marketing", color: "bg-blue-500" },
    { id: 2, title: "Development", color: "bg-green-500" },
    { id: 3, title: "Planning", color: "bg-yellow-500" },
    { id: 4, title: "Deployment", color: "bg-pink-400" },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard boards={boards} />} />
        <Route path="/Create-Board" element={<CreateBoardModal />} />
        <Route path="/people" element={<People boards={boards} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
