import React, { useState } from "react";
import '../css/Login.css';
 import Auth from "../services/auth.service";
 import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

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
        
      

      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundColor: '#000', color: '#000' }}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5"> Login</h2>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' name="uname" required/>
          <MDBInput wrapperClass='mb-4' label='Your Password' size='lg' id='form3' type='password'  name="pass" required/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Log in</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
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