import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br></br>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br></br>
      <label>Your username is: {username}</label><br></br>
      <label>Your password is: {password}</label><br></br>
      <button>Login</button>
    </div>
  );
}
