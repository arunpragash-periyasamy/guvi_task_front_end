import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp';
import { ToastProvider } from './Components/Toast/ToastContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <ToastProvider>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signUp' element={<SignUp />}></Route>
          </Routes>
        </ToastProvider>
      </Router>
    </>
  )
}

export default App
