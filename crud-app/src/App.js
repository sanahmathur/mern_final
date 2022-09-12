import React, { useState } from 'react'
import Homepage from './components/homepage/Homepage'
import Register from './components/register/Register'
import Login from './components/login/Login'

import {BrowserRouter,Routes ,Route} from 'react-router-dom'

import Header from './components/Header'
import Crud from './components/CRUD/Crud'

const App = () => {
  const [user,setLoginUser] = useState({})
 
  return (
    
    <>
    
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Register />}/>
     <Route path="/" element={
      ()=>{
        user && user._id ? <Crud />:<Login setLoginUser={setLoginUser}  />
      }
    } /> 
    
      <Route exact path="/login" element={<Login setLoginUser={setLoginUser}/>} />
    
      <Route path="/register" element={<Register />} />
      <Route path="/Crud" element={<Crud />}/>
      <Route path="/Crud/:id" element={<Crud />} />
      <Route path="/Crud/login" element={<Login setLoginUser={setLoginUser}/>}/>
      <Route exact path="Crud/home/:id" element={<Homepage />} />
      
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App