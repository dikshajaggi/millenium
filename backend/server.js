import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(json());

// Import routes
import cartRoutes from './routes/cart';
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
