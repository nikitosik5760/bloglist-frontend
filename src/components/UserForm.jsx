import React from "react";
import { useState } from "react";

export default function UserForm({ loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form className="user-form">
      <label htmlFor="username">username</label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit" onClick={handleLogin}>
        login
      </button>
    </form>
  );
}
