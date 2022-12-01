import React, { useState } from "react";
import '../css/Connexion.css';
 import Auth from "../services/auth.service";

function Login() {
 

  const [message, setMessage] = useState(undefined)

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    Auth.Log_in(uname.value, pass.value).then(
        response => {
            if(response.response) {
                setMessage(response.response.data.message)
            }else{
                setMessage(response.data.message)
            }
        }
      ).catch(e => {
        setMessage(e.message)
      });
 };


  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="uname" required />
          {/* {// renderErrorMessage("uname")} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {message ? <div>{message}</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;