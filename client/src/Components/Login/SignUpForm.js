import React, { useState } from "react";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation
      }),
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
        <h4>Sign Up</h4>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          className='form-control'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <button type="submit" className='btn btn-primary'>{isLoading ? "Loading..." : "Sign Up"}</button>
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

export default SignUpForm;