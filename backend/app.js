import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import connectDB from './Db.js';
import { authenticateAdmin } from './auth.js';
import productRoutes from "./apis/Product.api.js";
import addProductRoutes from './apis/AddProduct.api.js';
import addCategoryRoutes from './apis/AddCategory.api.js';
import authRoutes from "./apis/Auth.api.js";
import categoryRoute from "./apis/Category.api.js";
import userRoutes from "./apis/User.api.js";
import cartRoutes from "./apis/Cart.api.js";
import verificationRoutes from "./apis/verificationRoutes.js";
import checkoutRoute from "./apis/Checkout.api.js";
import path from 'path';

const { json } = pkg;
const app = express();

app.use(cors());
app.use(json());
app.use(express.static(path.join(new URL('.', import.meta.url).pathname, 'frontend/build')));

// Connect to MongoDB
connectDB();
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', authenticateAdmin, addProductRoutes, addCategoryRoutes);
app.use('/api/', productRoutes, categoryRoute);
app.use('/api/cart', cartRoutes);
app.use('/api/order', verificationRoutes);
app.use('/api/', checkoutRoute);

app.get("/", (req, res) => {
    res.send("working");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(new URL('.', import.meta.url).pathname, 'frontend/build/index.html'));
});

export default app;
