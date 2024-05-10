import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("Invalid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitEvent}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleInput}
        />
        <br></br>
        <input
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleInput}
        />
        <br></br>
        <button>Login</button>
      </form>
    </div>
  );
}
