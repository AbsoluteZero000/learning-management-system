import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../components/Welcome/Welcome";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
