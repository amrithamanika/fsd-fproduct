import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    axios.post("http://localhost:3000/log", input)
      .then((res) => {
        alert(res.data.message);
        console.log(res.data.message);

        if (res.data.message === "Logged in successfully") {
          localStorage.setItem('user', JSON.stringify({
            email: res.data.email,
            name: res.data.name,
            userType: res.data.userType,
            userId: res.data.userId
          }));

          if (res.data.name=== "admin"||res.data.userType==="admin") 
          {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }
      })
      .catch((err) => {
        console.log("Login error:", err);
        alert("An error occurred during login");
      });
  };

  return (
    <div align='center'>
      <br /><br /><br />
      <Typography variant='h4' color='primary'>Login</Typography>
      <br /><br />
      <TextField
        variant='outlined'
        label="Email"
        name="Email"
        value={input.Email}
        onChange={inputHandler}
      /><br /><br />

      <TextField
        variant='outlined'
        label="Password"
        type="password"
        name="Password"
        value={input.Password}
        onChange={inputHandler}
      /><br /><br />

      <Button variant='contained' onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;