import express from 'express';
import {
    getAllCompetitions,
    createCompetition,
    updateCompetition,
    deleteCompetition,
    addCriteria,
    updateCriteria,
    deleteCriteria
} from '../controllers/competitionController.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Public route
router.get('/', getAllCompetitions);

// Protected routes (admin only)
router.post('/', authenticateToken, requireRole('admin'), createCompetition);
router.put('/:id', authenticateToken, requireRole('admin'), updateCompetition);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteCompetition);

// Criteria routes (admin only)
router.post('/:competitionId/criteria', authenticateToken, requireRole('admin'), addCriteria);
router.put('/criteria/:id', authenticateToken, requireRole('admin'), updateCriteria);
router.delete('/criteria/:id', authenticateToken, requireRole('admin'), deleteCriteria);

export default router;
