import express from 'express';
import { login, createUser, getUsers, deleteUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes (admin only)
router.post('/users', authenticateToken, requireRole('admin'), createUser);
router.get('/users', authenticateToken, requireRole('admin'), getUsers);
router.delete('/users/:id', authenticateToken, requireRole('admin'), deleteUser);

export default router;
