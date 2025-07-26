import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Add from './components/Add'
import View from './components/View'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import User from './components/User'
import Admin from './components/Admin'
import AdminProfile from './components/AdminProfile'
import UserProfile from './components/UserProfile'
import Cart from './components/Cart'


function App() {
  const [count, setCount] = useState(0)
  const user = JSON.parse(localStorage.getItem("user"));

   return (
    <>
 
      <Navbar /> 
      <Routes>
        <Route path='/view' element={<View />} />
        <Route path='/' element={<Signup />} />
        <Route path='/add' element={<Add />} />
        <Route path='/log' element={<Login />} />
        <Route path='/sign' element={<Signup />} />
        <Route path='/user' element={<User />} />
        <Route path='/admin' element={<Admin />} /> 
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path='/adminprofile' element={<AdminProfile />} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </>
  )
}

export default App