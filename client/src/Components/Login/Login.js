import { useState } from "react";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <h1 className='container rounded p-3 my-2 border bg-light display-1 text-center'>Local History Atlas</h1>
      <div className="container card text-center col-6">
        {showLogin ? (
            <>
                <LoginForm onLogin={onLogin} />
                <p>
                    Don't have an account? &nbsp;
                    <button className="btn btn-secondary" onClick={() => setShowLogin(false)}>
                    Sign Up
                    </button>
                </p>
            </>
        ) : (
            <>
            <SignUpForm onLogin={onLogin} />
            <p>
                Already have an account? &nbsp;
                <button className="btn btn-secondary" onClick={() => setShowLogin(true)}>
                Log In
                </button>
            </p>
            </>
        )}
      </div>
    </div>
  );
}

export default Login;
