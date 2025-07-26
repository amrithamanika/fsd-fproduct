const express = require("express");
require("./connection");
const proModel = require("./Model/Product");
const userModel = require("./Model/User");
const CartModel = require('./Model/Cart');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Signup 
app.post('/signup', async (req, res) => {
  try {
    await userModel(req.body).save();
    res.send({ message: "Signed Up!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Signup failed" });
  }
});

// Login 
app.post("/log", async (req, res) => {
  try {
    const user = await userModel.findOne({ Email: req.body.Email });

    if (!user) return res.send({ message: "User not found" });

    if (user.Password === req.body.Password) {
     console.log("User logged in:", user._id);
      return res.send({
        message: "Logged in successfully",
        userType: user.userType,
        name: user.Name,
        email: user.Email,
        userId: user._id
      });
    } else {
      return res.send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred during login" });
  }
});

//  View all users
app.get("/uview", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching users" });
  }
});

// Products - Add product
app.post('/add', async (req, res) => {
  try {
    await proModel(req.body).save();
    res.send({ message: "Data added!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding data" });
  }
});

// View all products
app.get("/view", async (req, res) => {
  try {
    const data = await proModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching products" });
  }
});

// Delete product
app.delete("/del/:id", async (req, res) => {
  try {
    await proModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Data deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting product" });
  }
});

// Update product
app.put("/update/:id", async (req, res) => {
  try {
    await proModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Data updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating product" });
  }
});

// Add to Cart
app.post("/add-to-cart", async (req, res) => {
  try {
    await CartModel(req.body).save();
    res.send({ message: "Added to Cart!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to add to cart" });
  }
});



app.get("/my-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const cartItems = await CartModel.find({ userId })
      .populate("productId");

    res.send(cartItems);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).send({ message: "Error fetching cart" });
  }
});


//Remove from Cart
app.delete("/remove-from-cart/:id", async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Item removed from cart" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error removing item" });
  }
});


app.listen(3000, () => {
  console.log("Port is running!");
});