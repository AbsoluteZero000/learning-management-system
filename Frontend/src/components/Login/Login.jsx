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
    auth.loginAction(input);
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
          required
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInput}
          required
        />
        <br></br>
        <button>Login</button>
      </form>
    </div>
  );
}
