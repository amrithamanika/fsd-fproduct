import React, { useEffect, useState } from 'react';
import {
  Card, CardMedia, Grid, CardContent, Typography, Button,AppBar,Toolbar,CircularProgress} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (!storedUser || !storedUser.userId) {
      alert("Please log in to view your cart.");
      navigate("/log");
      setLoading(false);
      return;
    }

    fetchCartItems(storedUser.userId);
  }, [navigate]);

  const fetchCartItems = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`http://localhost:3000/my-cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
      setError("Failed to load cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/remove-from-cart/${cartItemId}`);
      alert(res.data.message);
      setCartItems(cartItems.filter(item => item._id !== cartItemId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.productId?.Price || 0) * (item.quantity || 1);
  }, 0);

  if (!user || !user.userId) {
    return null;
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant='h4' component="div" sx={{ flexGrow: 1 }}>My Cart</Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <br />

      {loading ? (
        <Typography className="text-center"> {/* Applied class */}
          <CircularProgress />
          <p>Loading your cart...</p>
        </Typography>
      ) : error ? (
        <Typography className="text-center" color="error"> 
          {error}
        </Typography>
      ) : cartItems.length === 0 ? (
        <Typography className="text-center">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} className="cart-grid-container"> 
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card className="cart-product-card">
                  <CardMedia
                    component="img"
                  
                    image={item.productId?.Image || "https://via.placeholder.com/200"}
                    alt={item.productId?.Name || "Product image"}
                  />
                  <CardContent> 
                    <Typography gutterBottom variant="h6">{item.productId.Name || "N/A"}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {item.productId.Description || "No description available."}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                      <b>₹{item.productId.Price.toFixed(2) || '0.00'}</b> x {item.quantity || 1}
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary">
                      Subtotal: ₹{((item.productId.Price || 0) * (item.quantity || 1)).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" className="cart-total-typography"> 
            Total: ₹{total.toFixed(2)}
          </Typography>
        </>
      )}
    </div>
  );
};

export default Cart;