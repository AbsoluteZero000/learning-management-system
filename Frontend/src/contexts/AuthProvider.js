import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      // Simulating a successful login for demonstration purposes
      setUser(data.username);
      localStorage.setItem("site", "loggedIn");
      navigate("home");
    } catch (err) {
      console.error(err);
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
