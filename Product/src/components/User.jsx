import {AppBar,Box,Button,Paper,Toolbar,Typography,Grid, Card, CardContent,CardMedia,}from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  var navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/log");
  };

  useEffect(() => {
    axios.get("http://localhost:3000/view")
      .then(res => setProducts(res.data))
      .catch(err => console.log("Product fetch error:", err));
  }, []);

  const handleAddToCart = (productId) => {
    axios.post("http://localhost:3000/add-to-cart", {
      userId: user.userId,
      productId: productId,
      quantity: 1
    })
      .then(res => {
        alert(res.data.message);
        navigate("/cart"); 
      })
      .catch(err => {
        console.error("Add to cart error:", err);
        alert("Failed to add to cart");
      });
  };

  return (
    <div>
      <br />
      <AppBar>
        <Toolbar>
          <Typography variant='h4' component="div" sx={{ flexGrow: 1 }}>User</Typography>
          <Link to="/userprofile">
            <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }}>Profile</Button>
          </Link>
          &nbsp;
          <Link to="/user">
            <Button color="secondary" variant="contained" sx={{ marginLeft: 1 }}>View</Button>
          </Link>
          &nbsp;
          <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4 }}>
        <Typography variant='h5' gutterBottom>Available Products</Typography>
        <Grid container spacing={2}>
          {products.map(product => (
            <Grid key={product._id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.Name}
                  height="140"
                  image={product.Image || "https://via.placeholder.com/150"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    <b>{product.Name}</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{product.Desc
                }</Typography>
                  <Typography variant="body2" color="text.secondary"><b>₹{product.Price}</b></Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddToCart(product._id)}
                    sx={{ mt: 1 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default User;

