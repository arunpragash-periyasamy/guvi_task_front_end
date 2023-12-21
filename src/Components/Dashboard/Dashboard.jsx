import React, {useEffect} from "react";
import './Dashboard.css';
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import ProfileUpdate from "../ProfileUpdate/ProfileUpdate";
import { useAuth } from '../AuthProvider/AuthProvider';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = () => {
            if((localStorage.getItem('authToken') !== null)){
                login(localStorage.getItem('authToken'));
            }else{
                navigate("/login");
            }
        };
        checkAuthentication();
    }, []);
    return (
        <>
            <Header />
            <div className="dashboard-container">

                <div className="main-body">
                    <div className="content">
                        <Navbar />
                        <DashboardHeader />
                    </div>

                    <ProfileUpdate/>
                </div>




            </div>
        </>
    )
}

export default Dashboard;