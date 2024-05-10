import { Routes, Route } from "react-router-dom";
import Welcome from "../components/Welcome/Welcome";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import PrivateRoute from "./privateroutes";
import Home from "../components/Home/Home";
import LoggedInRoute from "./loggedinroutes";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route element={<LoggedInRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default RoutesComponent;
