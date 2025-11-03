import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import AccessToekn from './pages/AccessToekn'
import Home from './pages/Home'
import "./App.css"

const App = () => {

  const PrivateRoute=({children})=>{
   const accessToken=localStorage.getItem("accessToken");
   return accessToken ? children : <Navigate to="/login" />
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth-success' element={<AccessToekn />} />
        <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App