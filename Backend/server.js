import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contRoutes from './routes/contRoutes.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/contacts',contRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => {
      console.log('🚀 Server is running on port 5000');
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
