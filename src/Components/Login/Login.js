import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Box, Button, TextField, Paper, Toolbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpen';
import {Avatar, Typography} from '@material-ui/core';
import './Login.css'

export default function Login() {
  const history = useHistory()

  if(localStorage.getItem('x-auth-token')) history.push('/')

  //Component States
  const [invalid, setInvalid] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({
    email: '',
    password: ''
  })

  function validate(data) {
    let isValid = true

    const errorTemp = {
      email: '',
      password: ''
    }
    
    if(data.email.trim() === '' || !data.email.includes('@') || !data.email.includes('.') || data.email.length < 3) {
        errorTemp.email = 'Enter a valid email.'
        isValid = false
    }

    if(data.password.trim() === '') {
      errorTemp.password = 'Enter your password.'
      isValid = false
    }

    setError(errorTemp)
    return isValid    
  }
  
  function handleInputChange(event, property) {
    const userTemp = {...user}
    if(event.target.id) property = event.target.id
    
    userTemp[property] = event.target.value

    setUser(userTemp)
    validate(userTemp)
  }

  async function handleSubmit(event) {
    try {
      console.log(user)
      const res = await axios.post('http://localhost:8000/milluki/auth', user)

      if(res.data) {
        localStorage.setItem('x-auth-token', JSON.stringify(res.data))
        window.location.reload()
      }

      else {
        setInvalid(true)
        console.log('INVALIDO')
      }
    }
    
    catch(e) {
      console.log('azedou')
      setInvalid(true)
      console.log('INVALIDO')
    }
  }  

    return (
      <Paper 
        alignContent='center'
        className='formLogin' 
        component='form'
        elevation='4' 
        onSubmit={handleSubmit}
      >
        
        <Toolbar className='formLoginText'>
          <Avatar style={{backgroundColor: 'rgb(63, 81, 181)', display: 'flex', justifyContent: 'center', margin: '0 13% 0 0'}}>
              <LockOutlinedIcon/>
          </Avatar>
        </Toolbar>
        <Typography style={{display: 'flex', margin: '-5% 0 5% 0', justifyContent: 'center'}} component="h1" variant="h5">
          Sign up
        </Typography>
        <div className='formErrorText' style={invalid === false ? {'visibility' : 'hidden'} : {'visibility' : 'visible'}}>Invalid credentials. Please, try again.</div>
        <Box sx={{
            display: "flexblock",
            position: "relative",
            margin: "0 0 0 1.5%",
            alignContent: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: "20vw",
            heigth: "50vh",
            "& .MuiFormControl-root": {
              display: "box",
              margin: "10% 0 5% 10%",
          }}}>
          <TextField
              id="email" 
              label="Email" 
              value={user.email} 
              required 
              placeHolder=""
              variant='outlined'
              size='medium'   
              fullWidth      
              onChange={handleInputChange}
              error={error.email !== ''}
              helperText={error.email}
          />
          <TextField
              id="password" 
              label="Password" 
              variant="outlined"
              type='password'
              value={user.password}              
              required 
              placeHolder=""
              fullWidth
              onChange={handleInputChange}
              error={error.password !== ''}
              helperText={error.password}
          />
          <Toolbar className='loginToolbar'>
            <Button 
              type='submit'
              variant='contained'
              fullWidth
              color='primary'
              size='medium'
            >
              Login
            </Button>
          </Toolbar>
        </Box>
      </Paper>
    );
}
