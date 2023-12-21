import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./SignUp.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Toast/ToastContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { successAlert, errorAlert } = useToast();
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const validEmail =  async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  const validPassword =  async () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = pattern.test(password);
    setIsValidPassword(isValid);
    return isValid;
  };

  const validConfirmPassword =  async () => {
    const isValid = (password === confirmPassword)
    setIsValidConfirmPassword(isValid)
    return isValid;
  }

  const validName = async () => {
    const pattern = /^[A-Za-z]+[A-Za-z. ]*$/;
    const isValid = pattern.test(name);
    setIsValidName(isValid);
    return isValid;
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const validForm = async (e) => {
    e.preventDefault();
    if(await validName() && await validEmail() && await validPassword() && await validConfirmPassword()){
      formSubmit();
    }
  }

  const formSubmit = async (e) => {
    try{
      const response = await axios.post('http://52.90.159.84:3000/signup', { name: name, email: email, password: password })
      successAlert("Registered Successfully check mail");
      navigate("/login");
    }
    catch(err){
        if(err.response.status === 409){
          errorAlert("Email already exists");
          console.log(err.response);
        }else if(err.response.status === 500){
          errorAlert("Server error, Try Later")
        }
        else{
          errorAlert("Faild to register, Try Later")
        }
      }
  }
  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="signup" method="POST">

              <h2>SignUp Form</h2>
              <div className="signup__field">
                <input
                  type="text" name="name"
                  className="signup__input"
                  value={name}
                  placeholder="Name" onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                  onBlur={validName}
                />
                {!isValidName && (
                  <Tooltip title="Name should contains only alphabets"><p className="error">Invalid name.</p></Tooltip>
                )}
              </div>
              <div className="signup__field">
                <input
                  type="text" name="email"
                  className="signup__input"
                  value={email}
                  placeholder="Email" onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  onBlur={validEmail}
                />
                {!isValidEmail && (
                  <Tooltip title="Email should contains @, domain">
                    <p className="error">Invalid email id.</p></Tooltip>
                )}
              </div>

              <div className="signup__field">
                <input
                  type="password"
                  className="signup__input"
                  name="password"
                  placeholder="Password"
                  onBlur={validPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isValidPassword && (
                  <Tooltip title={"Should contain lowercase, special character, uppercase, digits, 8 characters or more."}><p className="error">Weak Password</p></Tooltip>
                )}
              </div>
              <div className="signup__field">
                <input
                  type="password"
                  className="signup__input"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onBlur={validConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!isValidConfirmPassword && (
                  <Tooltip title="Password Does not match"><p className="error">Incorrect Password</p></Tooltip>
                )}
              </div>

              <button className="button signup__submit" onClick={validForm}>
                <span className="button__text">SignUp Now</span>
              </button>
            </form>
            <div className="social-signup">
              <h3>Already have an account</h3>
              <div className="social-icons">
                <button className="button signup__submit">
                  <span className="button__text">Login Now</span>
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
};

export default SignUp;
