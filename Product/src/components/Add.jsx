import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Add = () => {
  var [input,setInput] =useState({Name:"",Price:"",Description:"",Image:""})
  var navigate = useNavigate()
  var location = useLocation() 
  //console.log("loc",location)
  console.log("loc",location.state)

  const inputHandler = (e) => {
   // console.log(e.target.value)
    setInput({...input,[e.target.name]:e.target.value})
    console.log(input)
  }

  //useEffect
  useEffect(() => {
    if(location.state !== null){
      setInput({
    ...input,
    Name : location.state.val.Name,
    Price : location.state.val.Price,
    Description : location.state.val.Description,
    Image : location.state.val.Image,
  })
  }
},[])
  


  //ADD btn
  const addproduct = () => {
  console.log(input)
  if(location.state !== null){
     axios.put("http://localhost:3000/up/"+location.state.val._id,input)
  .then((res) => {
    console.log(res.data.message)
    alert(res.data.message)
    navigate("/")
  })
  }
  else{
    axios.post("http://localhost:3000/add/",input)
    .then((res) => {
    console.log(res.data.message)
    alert(res.data.message)
    navigate("/")
    
  })
  }
  
}
return (
    <div align='center'><br /><br />
    <br></br><br></br><br></br>
      <Typography variant='h4' color='primary'>Add Product</Typography>
      <TextField variant='outlined' label='Name' name='Name' value={input.Name} onChange={inputHandler}></TextField><br /><br />
      <TextField variant='outlined' label='Price' name='Price' value={input.Price} onChange={inputHandler}></TextField><br /><br />
      <TextField variant='outlined' label='Description' name='Description' value={input.Description} onChange={inputHandler}></TextField><br /><br />
      <TextField variant='outlined' label='image' name='Image' value={input.Image} onChange={inputHandler}></TextField><br /><br />
      <Button variant='contained' onClick={addproduct}> Add </Button>
    </div>
  )
 
}
export default Add