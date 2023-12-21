import React, { useState, useEffect } from "react";
import { useToast } from '../Toast/ToastContext';
import './ProfileUpdate.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const ProfileUpdate = () => {
const navigate = useNavigate();
  const { successAlert, errorAlert } = useToast();
    const authToken = localStorage.getItem('authToken');
    const config = {
        headers :{
            'Authorization': `${authToken}`,
        }
    }
    const [name, setName] = useState("");
    const [isValidName, setIsValidName] = useState(true);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
    const [age, setAge] = useState("");
    const [isValidAge, setIsValidAge] = useState(true);
    const [gender, setGender] = useState("male");
    const [isValidGender, setIsValidGender] = useState(true);
    const [mobileNumber, setMobileNumber] = useState("");
    const [isValidMobileNumber, setIsValidMobileNumber] = useState(true);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 3);

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    const calculateAge = async () => {
        if(dateOfBirth !== null && dateOfBirth !== ""){
            const dob = new Date(dateOfBirth);
            const currentDate = new Date();
            setAge(currentDate.getFullYear() - dob.getFullYear());
            if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
                setAge(age - 1);
            }
        }else{
            setIsValidDateOfBirth(false);
        }
    }


    const validEmail = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(email);
        setIsValidEmail(isValid);
        return isValid;
    };

    const validDateOfBirth = async () => {
        const isValid = (dateOfBirth !== null && dateOfBirth !== "");
        setIsValidDateOfBirth(isValid);
        calculateAge();
        return isValid;
    }

    const validAge = async () => {
        const isValid = (age !== null && age !== "" || age >= 3);
        setIsValidAge(isValid);
        return isValid;
    }

    const validName = async () => {
        const pattern = /^[A-Za-z]+[A-Za-z. ]*$/;
        const isValid = pattern.test(name);
        setIsValidName(isValid);
        return isValid;
    }

    const validMobileNumber = async () => {
        const regex = /^[6-9]\d{9}$/;
        const isValid = regex.test(mobileNumber);
        setIsValidMobileNumber(isValid);
        return isValid;
    }

    const validGender = async () => {
        const isValid = (gender !== null && gender !== "");
        setIsValidGender(isValid);
        return isValid;
    }
    const validateForm = async(e) => {
        e.preventDefault();
        if (await validAge() && await validDateOfBirth() && await validEmail() && await validMobileNumber() && await validName() && await validGender()) {
            try{
                const id = 1234;
                const data = {
                    name: name,
                    email: email,
                    dob: dateOfBirth,
                    age: age,
                    gender: gender,
                    mobileNumber: mobileNumber
                }
                const response = await axios.post(`http://52.90.159.84:3000/update`, data, config)
                successAlert("Updated Successfully Check Mail");
                // navigate("/login");
              }
              catch(err){
                console.log(err);
                if(err.response.status === 500){
                    errorAlert("Server error, Try Later")
                  }
                  else{
                    errorAlert("Faild to register, Try Later")
                  }
                }
        }else{
            errorAlert("Invalid form")
        }
    }

    useEffect(()=>{
        const fetchData = async() =>{ 
            try{
                const response = await axios.get("http://52.90.159.84:3000/data", config);
                const data = response.data;
		if('dob' in data){
                const date = new Date(data?.dob ?? '').toISOString().split('T')[0];
                setDateOfBirth(date ?? '');
		}
                setName(data?.name ?? '');
                setEmail(data?.email ?? '');
                setMobileNumber(data?.mobileNumber ?? '');
                setAge(data?.age ?? '');
            }catch(err){
                console.error(err);
            }
        }
        fetchData();
    },[])

    return (
        <>
            <form id="form" action="/">
                <h1>Registration</h1>
                <div className="input-control">
                    <label htmlFor="username">Name</label>
                    <input id="username" name="name" type="text" value={name} onChange={(e) => setName(capitalizeFirstLetter(e.target.value))} onBlur={validName} />
                    <div className="error">{!isValidName && (
                        "Invalid Name"
                    )}</div>
                </div>
                <div className="input-control">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} onBlur={validEmail} />
                    <div className="error">{!isValidEmail && (
                        "Invalid Email "
                    )}</div>
                </div>
                <div className="input-control">
                    <label htmlFor="dateOfBirth">Date of birth(minimum 3 years)</label>
                    <input id="dateOfBirth" name="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} onBlur={validDateOfBirth} max={maxDate.toISOString().split('T')[0]} />
                    <div className="error">{!isValidDateOfBirth && (
                        "Invalid Date"
                    )}</div>
                </div>
                <div className="input-control">
                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} onBlur={validAge} />
                    <div className="error">{!isValidAge && (
                        "Invalid Age"
                    )}</div>
                </div>
                <div className="input-control">
                    <label htmlFor="gender">Gender</label>
                    <select name="" id="gender" className="gender input-control" onChange={(e) => setGender(e.target.value)} onBlur={validGender}>
                        <option value="male" id="male">Male</option>
                        <option value="female" id="female">Female</option>
                    </select>
                    <div className="error">{!isValidGender && (
                        "Select Gender"
                    )}</div>
                </div>
                <div className="input-control">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input id="mobileNumber" name="mobileNumber" value={mobileNumber} type="number" onChange={(e) => setMobileNumber(e.target.value)} onBlur={validMobileNumber} />
                    <div className="error">{!isValidMobileNumber && (
                        "Invalid Mobile number"
                    )}</div>
                </div>
                <button type="button" onClick={validateForm}>Update</button>
            </form>
        </>
    )
}

export default ProfileUpdate;
