import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'  
import dotenv from 'dotenv'
dotenv.config();
import { auth, typing,leaderboard} from './Routes/index.js'
import connectDB from './db/connect.js'
const app = express()
const PORT = 5000;

//Middleware 
app.use(cors());
app.use(express.json());
// Routes
app.use('/api', leaderboard);
app.use('/api/auth', auth);
app.use('/api/typing', typing);
connectDB();
app.listen(PORT,() => {
    console.log('Server is running on port 5000')
});
