import React from 'react';
import { Typography, Paper, Box, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/log");
  };

  return (
    <>
        <AppBar>
          <Toolbar>
            <Typography variant='h4' component="div" sx={{ flexGrow: 1 }}>Admin</Typography>
                <Link to='/add'>
                  <Button variant='contained' color='secondary'>Add</Button>
                 </Link> 
                   &nbsp;
                  <Link to="/view">
                    <Button color="secondary" variant="contained" sx={{ marginLeft: 1 }}>View</Button>
                  </Link>
                  &nbsp;
                  <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={handleLogout}>Logout</Button>
                 &nbsp;
          </Toolbar>
        </AppBar>             
      <br></br>
      <br></br>
      <br></br>
      <center>
      <Box sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
          <Typography variant="h4" gutterBottom>Admin Information</Typography>

          {user ? (
            <>
              <Typography variant="h6" gutterBottom>
                <strong>Name:</strong> {user.name || 'Not available'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Email:</strong> {user.email || 'Not available'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Account Type:</strong> {user.userType === 'admin' ? 'Administrator' : 'Regular User'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/')}
                  sx={{ mr: 2 }}
                >
                  Back to Home
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h6">
              No user data found. Please login again.
            </Typography>
          )}
        </Paper>
      </Box>
      </center>
    </>
  );
};

export default Admin;