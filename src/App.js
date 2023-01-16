import Home from "./pages/Home";
import { ChatContextProvider } from "./context/chatContext";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <ChatContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ChatContextProvider>
  );
};

export default App;

