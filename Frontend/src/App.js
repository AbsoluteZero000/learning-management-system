import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthProvider";
import RoutesComponent from "./routes/Routes";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
