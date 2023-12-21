import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp';
import { ToastProvider } from './Components/Toast/ToastContext';
import DashboardContent from './Components/ProfileUpdate/ProfileUpdate';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthProvider } from './Components/AuthProvider/AuthProvider';

function App() {
  return (
    <>
      <Router>
        <ToastProvider>
          <AuthProvider>
          <Routes>
          {/* <Route path="/" element={isUserLoggedIn() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/signup" />
              )}></Route>
          <Route path="/dashboard" element={isUserLoggedIn() ? (
                <Dashboard/>
                ) : (
                  <Navigate to="/signup" />
                  )}></Route>
          <Route path="/signup" element={isUserLoggedIn() ? (
            <Navigate to="/dashboard" />
            ) : (
                <SignUp/>
              )}></Route>
          <Route path="/login" element={isUserLoggedIn() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login/>
              )}></Route> */}
            <Route path="/" element={<Login/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Routes>
          </AuthProvider>
        </ToastProvider>
      </Router>
    </>
  )
}

export default App
