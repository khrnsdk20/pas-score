import express from 'express';
import {
    getAllParticipants,
    createParticipant,
    updateParticipant,
    deleteParticipant,
    getParticipantByNumber
} from '../controllers/participantController.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Public route
router.get('/number/:participantNumber', getParticipantByNumber);

// Protected routes (admin only)
router.get('/', authenticateToken, requireRole('admin'), getAllParticipants);
router.post('/', authenticateToken, requireRole('admin'), createParticipant);
router.put('/:id', authenticateToken, requireRole('admin'), updateParticipant);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteParticipant);

export default router;
