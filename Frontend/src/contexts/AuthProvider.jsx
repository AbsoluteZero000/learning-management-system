import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { usersMicroservice } from "../routes/axiosinstances";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const res = await usersMicroservice.post("/login", data);
      if (res.data[1] === 401) {
        alert(res.data[0].message);
        return;
      }
      const response = JSON.stringify(res.data[0].user);
      localStorage.setItem("user", response);
      navigate("home");
    } catch (err) {
      alert("Network Error.");
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
