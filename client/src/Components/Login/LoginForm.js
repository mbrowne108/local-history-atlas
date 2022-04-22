import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <h4>Login</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className='form-control'
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className='form-control'
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <button variant="fill" color="primary" type="submit" className='btn btn-primary'>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div>
        {errors ? errors.map((err) => (
          <p className='alert alert-danger alert-dismissible fade show mb-3' key={err}>
            {err} 
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </p>
        )) : null}
      </div>
    </form>
  );
}

export default LoginForm;
