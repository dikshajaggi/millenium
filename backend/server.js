import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import cartRouter from './routes/cart.js';
import productRouter from './routes/product.js';
import "dotenv/config"
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';
import categoryRouter from './routes/category.js';
import searchRouter from './routes/search.js';

const app = express();
// const PORT = process.env.PORT || 8000;
const PORT = 8000
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors(process.env.CORS_URL));

app.use("/images", express.static("uploads"))
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/search', searchRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
