import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Product schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
});

// Product model
const Product = mongoose.model('Product', productSchema);

// Cart schema
const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
});

// Cart model
const CartItem = mongoose.model('CartItem', cartItemSchema);

// User schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// User model
const User = mongoose.model('User', userSchema);

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; 
    next();
  });
};

// API route to get all products
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API route to get a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API route to add a new product
app.post('/api/products', async (req, res) => {
  const { title, description, price, images } = req.body;
  const newProduct = new Product({ title, description, price, images });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API route to add a product to the shopping cart
app.post('/api/cart', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const newCartItem = new CartItem({ userId: req.user.id, productId, quantity });

  try {
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API route to update the quantity of a product in the cart
app.put('/api/cart/:id', authenticateToken, async (req, res) => {
  const { quantity } = req.body;
  try {
    const updatedCartItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { quantity },
      { new: true, runValidators: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json(updatedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API route to remove a product from the cart
app.delete('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    const deletedCartItem = await CartItem.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User registration
app.post('/register', async (req, res) => {
  const { fullName, email, phone, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ fullName, email, phone, username, password: hashedPassword });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// API route for checkout 
app.post('/api/checkout', authenticateToken, async (req, res) => {
  const { shippingInfo, paymentInfo } = req.body;
  try {
    const cartItems = await CartItem.find({ userId: req.user.id }).populate('productId');
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in the cart.' });
    }
    res.status(201).json({ message: 'Order placed successfully!', shippingInfo, paymentInfo });
    await CartItem.deleteMany({ userId: req.user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed sample data route
app.post('/api/seed', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    await Product.deleteMany({});
    const productsToInsert = data.products.map(product => ({
      title: product.title,
      description: product.description,
      price: product.price,
      images: [product.images[0]],
    }));
    await Product.insertMany(productsToInsert);
    res.json({ message: 'Sample data inserted', count: productsToInsert.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
