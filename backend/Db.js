// db.js
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect('mongodb+srv://developerdiksha2000:diksha24may@cluster0.iecnqq4.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
