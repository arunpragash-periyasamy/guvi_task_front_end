import React, { useState } from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordError, setPasswordError] = useState(true);

    const validEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(newEmail);
        setIsValidEmail(isValid);
    }

    const validPassord = (e) =>{
        setIsValidPassword(e.target.value);
        let pattern = /^(?=.*[a-z])$/;
        let error = (pattern.test(password)) ? "welcome" : "lowercase, ";
        pattern = /^(?=.*[A-Z])$/;
        error += (pattern.test(password)) ? "" : "uppercase, ";
        pattern = /^(?=.\d)$/;
        error += (pattern.test(password)) ? "" : "digits, ";
        pattern = /^[a-zA-Z\d@#$%^&*?]{8,}$/;
        error += (pattern.test(password)) ? "" : "8 characters or more.";
        setPasswordError("Should contain "+error);
        const isValid = (error === "") ? true : false;
        setIsValidPassword(isValid);
    }

    return (
        <>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login">
                            <h2>Login Form</h2>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" placeholder="Email" onBlur={validEmail} />
                                {!isValidEmail && <p className='error'>Invalid email address.</p>}
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" className="login__input" placeholder="Password" onBlur={validPassord}/>
                                {!isValidPassword && <Tooltip title={passwordError}><p className='error'>Weaker Password.</p></Tooltip>}
                            </div>
                        
                            <button className="button login__submit">
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
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;