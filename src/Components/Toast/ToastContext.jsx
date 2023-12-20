import React, { createContext, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    // Your toast logic goes here
    const successAlert = (message) => {
        toast.success(message);
    };
    const errorAlert = (message) => {
        toast.error(message);
    };

    return (<>
        <ToastContainer />
        <ToastContext.Provider value={{ successAlert, errorAlert }}>
            {children}
        </ToastContext.Provider>
    </>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
