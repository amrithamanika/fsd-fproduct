import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  // Fetch products 
  useEffect(() => {
    axios.get("http://localhost:3000/view")  
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("View fetch error:", err.message);
      });
  }, []);


   // Delete product
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/del/${id}`)  
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Delete error:", err.message);
      });
  };

  // Navigate to update form
  const updateProduct = (val) => {
    navigate("/add", { state: { val } });
  };

  return (
    <div align='center' style={{ padding: '40px' }}>
      <br></br><br></br>
      <Grid container spacing={3} justifyContent="center">
        {product.map((val) => (
          <Grid key={val._id} item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                alt={val.Name}
                height="140"
                image={val.Image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  <b>{val.Name}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">{val.Description}</Typography>
                <Typography variant="body2" color="text.secondary"><b>{val.Price}</b></Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success" onClick={() => updateProduct(val)}>Update</Button>
                <Button size="small" variant="contained" color="error" onClick={() => deleteProduct(val._id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default View;