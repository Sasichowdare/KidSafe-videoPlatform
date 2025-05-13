// userRoutes.js
import express from 'express';
import { updateUser, updatePassword, getUserProfile } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/details', protect, getUserProfile);

// Update user profile
router.put('/update-user', protect, updateUser);

// Update user password
router.put('/update-password', protect, updatePassword);



export default router;
