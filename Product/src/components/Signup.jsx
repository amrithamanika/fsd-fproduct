import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [input, setInput] = useState({
    Name: '',
    Email: '',
    Password: '',
    Phone: ''
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    axios.post('http://localhost:3000/signup', input)
      .then(res => {
        alert(res.data.message)
        console.log(res.data.message)
        navigate('/log') 
      })
      .catch(err => {
        console.error('Signup failed:', err)
        alert('Signup failed. Please try again.')
      })
  }

  return (
    <div align='center'>
      <br /><br /><br /><br /><br />
      <Typography variant='h4' color='primary'>Sign Up</Typography>
      <br /><br />
      <TextField
        variant='outlined'
        label='Name'
        name='Name'
        value={input.Name}
        onChange={handleInputChange}
      />
      <br /><br />
      <TextField
        variant='outlined'
        label='Email'
        name='Email'
        value={input.Email}
        onChange={handleInputChange}
      />
      <br /><br />
      <TextField
        variant='outlined'
        type='password'
        label='Password'
        name='Password'
        value={input.Password}
        onChange={handleInputChange}
      />
      <br /><br />
      <TextField
        variant='outlined'
        label='Phone'
        name='Phone'
        value={input.Phone}
        onChange={handleInputChange}
      />
      <br /><br />
      <Button variant='contained' onClick={handleSubmit}>Sign Up</Button>
    </div>
  )
}

export default Signup