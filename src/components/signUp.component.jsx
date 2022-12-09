import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/SignUp.css';
import Auth from '../services/auth.service';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function SignUp() {
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [message, setMessage] = useState(undefined)

  // function to update state of name with
  // value enter by user in form
  const handleChange = (e) => {
    setName(e.target.value);
  }
  // function to update state of phonenumber with value
  // enter by user in form
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }
  // function to update state of email with value
  // enter by user in form
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  // function to update state of password with
  // value enter by user in form
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  // function to update state of confirm password
  // with value enter by user in form
  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  }
  // below function will be called when user
  // click on submit button .
  const handleSubmit = (e) => {
    if (password != confPassword) {
      // if 'password' and 'confirm password'
      // does not match.
      alert("password Not Match");
    }
    else {
      Auth.register(email, phonenumber, name, password).then(
        response => {
          if(response.data){
            setMessage(response.data.message)
          }else{
            setMessage(response.response.data.message)
          }
         
        }
      ).catch(e => {
        setMessage(e.message)
      });
    }
    e.preventDefault();

  }
  return (
    <div className="App">
     
      {
        !message ? (
          <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundColor: '#000', color: '#000' }}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
              <MDBCardBody className='px-5'>
                <h2 className="text-uppercase text-center mb-5">Créer un compte</h2>
                <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' value={name} required onChange={(e) => { handleChange(e) }} />
                <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} required onChange={(e) => { handleEmailChange(e) }} />
                <MDBInput wrapperClass='mb-4' label='Your Phone' size='lg' id='form6' type='number' value={phonenumber} required onChange={(e) => { handlePhoneNumberChange(e) }} />
                <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} required onChange={(e) => { handlePasswordChange(e) }} />
                <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' value={confPassword} required onChange={(e) => { handleConfPasswordChange(e) }} />
                <div className='d-flex flex-row justify-content-center mb-4'>
                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                </div>
                <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'  onClick={(e) => { handleSubmit(e) }}>S'inscrire</MDBBtn>
                <div>
            <p>
            Vous avez un compte 😁.<a href="/login">Connectez-vous !</a>
            </p>
          </div>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        ) : (
          <h1>{message}</h1>
        )
      }
    </div>
  );
}

export default SignUp