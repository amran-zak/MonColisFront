import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '../css/SignUp.css';
import Auth from '../services/auth.service';

function SignUp() {
    const [name , setName] = useState('');
    const [phonenumber , setPhoneNumber] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confPassword , setConfPassword] = useState('');

    const [message, setMessage] = useState(undefined)

    // function to update state of name with
    // value enter by user in form
    const handleChange =(e)=>{
      setName(e.target.value);
    }
    // function to update state of phonenumber with value
    // enter by user in form
    const handlePhoneNumberChange =(e)=>{
      setPhoneNumber(e.target.value);
    }
    // function to update state of email with value
    // enter by user in form
    const handleEmailChange =(e)=>{
      setEmail(e.target.value);
    }
      // function to update state of password with
      // value enter by user in form
    const handlePasswordChange =(e)=>{
      setPassword(e.target.value);
    }
      // function to update state of confirm password
      // with value enter by user in form
    const handleConfPasswordChange =(e)=>{
      setConfPassword(e.target.value);
    }
    // below function will be called when user
    // click on submit button .
    const handleSubmit=(e)=>{
      if(password!=confPassword)
      {
        // if 'password' and 'confirm password'
        // does not match.
        alert("password Not Match");
      }
      else{
        Auth.register(email,phonenumber,name,password).then(
          response => {
            setMessage(response.data.message)
          }
        ).catch(e => {
          setMessage(e.message)
        });
      }
      e.preventDefault();

    }
  return (
    <div className="App">
    <header className="App-header">
    {
      !message ? (
<form onSubmit={(e) => {handleSubmit(e)}}>
     {/*when user submit the form , handleSubmit()
        function will be called .*/}
     <div className='SignUp'>
    <h2> SignUp </h2>
    </div>
        <label >
          Name:
        </label><br/>
        <input type="text" value={name} required onChange={(e)=> {handleChange(e)}} /><br/>
          { /*when user write in name input box , handleChange()
              function will be called. */}
        <label >
          Phone number:
        </label><br/>
        <input type="text" value={phonenumber} required onChange={(e)=> {handlePhoneNumberChange(e)}} /><br/>
            { /*when user write in phonenumber input box , handlePhoneNumberChange()
               function will be called. */}
        <label>
          Email:
        </label><br/>
        <input type="email" value={email} required onChange={(e) => {handleEmailChange(e)}} /><br/>
          {/* when user write in email input box , handleEmailChange()
              function will be called.*/}
        <label>
          Password:
        </label><br/>
        <input type="password" value={password} required onChange={(e)=> {handlePasswordChange(e)}} /><br/>
              {/* when user write in password input box ,
                  handlePasswordChange() function will be called.*/}
        <label>
          Confirm Password:
        </label><br/>
        <input type="password" value={confPassword} required onChange={(e)=> {handleConfPasswordChange(e)}} /><br/>
                {/* when user write in confirm password  input box ,
                    handleConfPasswordChange() function will be called.*/}
        <input type="submit" value="Submit"/>
      </form>
      ): (
        <h1>{message}</h1>
      )
    }
    
    </header>

    </div>
  );
}

export default SignUp