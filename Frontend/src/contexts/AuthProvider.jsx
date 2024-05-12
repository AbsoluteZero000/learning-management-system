import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", data);
      const response = JSON.stringify(res.data[0].user);
      setUser(response);
      localStorage.setItem("user", response);
      navigate("home");
    } catch (err) {
      alert(err);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
