import React from 'react';
import { Box, Paper, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <>
    <div>

      <AppBar>
        <Toolbar>
          <Typography variant='h4' component="div" sx={{ flexGrow: 1 }}>Admin</Typography>
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <Box sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
          <Typography variant="h4" gutterBottom>User Profile</Typography>
          <Typography variant="h6">Name: {user.name}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          
         
          <Button
            sx={{ mt: 4 }}
            variant="contained"
            fullWidth
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
      </div>
    </>
  );
};

export default AdminProfile;