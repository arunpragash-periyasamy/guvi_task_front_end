import React, { useState } from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Toast/ToastContext';
import { useAuth } from '../AuthProvider/AuthProvider';

const Login = () => {
    const {authToken, login} = useAuth();
    const navigate = useNavigate();
  const { successAlert, errorAlert } = useToast();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordError, setPasswordError] = useState(true);

    const validEmail = async() => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(email);
        setIsValidEmail(isValid);
        return isValid;
    }

    
  const validPassworde =  async () => {
    // const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // const isValid = pattern.test(password);
    const isValid = (password !== null && password !== undefined && password !== "")
        setIsValidPassword(isValid);
        return isValid;  };

  const validForm = async(e) => {
    e.preventDefault();
    if(await validEmail() && await validPassworde()){
        authenticate();
    }
  }

  const authenticate = async() =>{
    try{
        const response = await axios.post("http://52.90.159.84:3000/login", {email:email, password: password});
        const done = await login(response.data);
        successAlert("Authentication success check mail")
        if(done)navigate("/dashboard");
    }catch(err){
        const errorMsg = err.response.data.error;
        errorAlert(errorMsg);
    }
  }

    return (
        <>
            <div className="login-container">
                <div className="login-screen">
                    <div className="login-screen__content">
                        <form className="login" method='POST'>
                            <h2>Login Form</h2>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" value={email} placeholder="Email" onBlur={validEmail} onChange={(e)=>setEmail((e.target.value).toLowerCase())}/>
                                {!isValidEmail && <p className='error'>Invalid email address.</p>}
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" className="login__input" placeholder="Password" onBlur={validPassworde} onChange={(e)=>setPassword(e.target.value)}/>
                                {!isValidPassword && <Tooltip title={passwordError}><p className='error'>Should not be empty</p></Tooltip>}
                            </div>
                        
                            <button className="button login__submit"onClick={validForm}>
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </form>
                        <div className="social-login">
                            <h3>New user</h3>
                            <div className="social-icons">

                                <button className="button login__submit">
                                    <a href="/signup">
                                    <span className="button__text">Sign Up Now</span>
                                    <i className="button__icon fas fa-chevron-right"></i></a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="login-screen__background">
                        <span className="login-screen__background__shape login-screen__background__shape4"></span>
                        <span className="login-screen__background__shape login-screen__background__shape3"></span>
                        <span className="login-screen__background__shape login-screen__background__shape2"></span>
                        <span className="login-screen__background__shape login-screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
