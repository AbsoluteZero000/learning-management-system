import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthProvider";
import RoutesComponent from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;