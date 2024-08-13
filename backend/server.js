import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import cartRouter from './routes/cart.js';
import productRouter from './routes/product.js';
import "dotenv/config"
import userRouter from './routes/user.js';

const app = express();
const PORT = process.env.PORT || 5000;

connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors("http://localhost:3000/"));

app.use("/images", express.static("uploads"))
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
