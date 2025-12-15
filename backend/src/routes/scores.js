import express from 'express';
import {
    submitScore,
    getScoresByCompetition,
    getParticipantResults
} from '../controllers/scoreController.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Public route
router.get('/results/:participantNumber', getParticipantResults);

// Protected routes
router.post('/', authenticateToken, requireRole('jury', 'admin'), submitScore);
router.get('/competition/:competitionId', authenticateToken, getScoresByCompetition);

export default router;
