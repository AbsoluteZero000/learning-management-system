import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to ELS!</h1>
      <p>Please choose an option:</p>
      <button onClick={() => navigate("login")}>Login</button>
      <button onClick={() => navigate("signup")}>Sign Up</button>
    </div>
  );
}
