import cors from 'cors';
import express from 'express';  
import dotenv from 'dotenv'; // Importing dotenv to load environment variables
import authRoutes from './routes/authRoutes.js'; // Importing authentication routes
import userRoutes from './routes/userRoutes.js'; // Importing user routes
import passwordResetRoutes from './routes/passwordResetRoutes.js'; // Importing password reset routes
dotenv.config(); // Loading environment variables from .env file

const app = express(); // Creating an instance of express
const PORT = process.env.PORT || 5000; // Setting the port from environment variables or default to 5000

app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); // Parsing JSON requests

app.use('/auth',authRoutes); // Mounting authentication routes on /auth path
app.use('/user',userRoutes); // Mounting user routes on /user path
app.use('/password-reset',passwordResetRoutes); // Mounting password reset routes on /password-reset path
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`); // Logging the server start message
})